import React from "react";
import {
  AlertTriangle,
  Clock,
  MapPin,
  Info,
  Shield,
  Calendar,
  FileText,
} from "lucide-react";
import "./WeatherAlerts.scss";
import { useSelector } from "react-redux";
import EmptyState from "../../../Components/Empty";
import { useNavigate } from "react-router-dom";

const WeatherAlerts = () => {
  // Lấy dữ liệu từ Redux (hoặc dùng mẫu nếu test)
  const alertsData = useSelector((state) => state.weather.value);

  const navigate = useNavigate();
  const handleChoose = () => {
    navigate("/weather-app");
  };
  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case "minor":
        return "alert-severity--minor";
      case "moderate":
        return "alert-severity--moderate";
      case "major":
        return "alert-severity--major";
      case "severe":
        return "alert-severity--severe";
      default:
        return "alert-severity--moderate";
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency?.toLowerCase()) {
      case "immediate":
        return "alert-urgency--immediate";
      case "expected":
        return "alert-urgency--expected";
      case "future":
        return "alert-urgency--future";
      default:
        return "alert-urgency--expected";
    }
  };

  const getCertaintyIcon = (certainty) => {
    switch (certainty?.toLowerCase()) {
      case "very likely":
      case "likely":
        return (
          <Shield className="alert-certainty__icon alert-certainty__icon--high" />
        );
      case "possible":
        return (
          <Info className="alert-certainty__icon alert-certainty__icon--medium" />
        );
      case "unlikely":
        return (
          <AlertTriangle className="alert-certainty__icon alert-certainty__icon--low" />
        );
      default:
        return <Info className="alert-certainty__icon" />;
    }
  };

  const getEventTypeIcon = (event) => {
    const eventLower = event?.toLowerCase() || "";
    if (eventLower.includes("flood"))
      return (
        <AlertTriangle className="alert-event__icon alert-event__icon--flood" />
      );
    if (eventLower.includes("storm") || eventLower.includes("wind"))
      return (
        <AlertTriangle className="alert-event__icon alert-event__icon--storm" />
      );
    if (eventLower.includes("heat") || eventLower.includes("fire"))
      return (
        <AlertTriangle className="alert-event__icon alert-event__icon--heat" />
      );
    if (
      eventLower.includes("cold") ||
      eventLower.includes("freeze") ||
      eventLower.includes("winter")
    )
      return (
        <AlertTriangle className="alert-event__icon alert-event__icon--cold" />
      );
    return <AlertTriangle className="alert-event__icon" />;
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  const parseAreas = (areas) => {
    if (typeof areas === "string") {
      return areas
        .split(";")
        .map((area) => area.trim())
        .filter((area) => area.length > 0);
    }
    return Array.isArray(areas) ? areas : [areas];
  };

  if (!alertsData) {
    return (
      <EmptyState
        title="Cant find the location data"
        description="Please choose location !"
        type="products"
        action={handleChoose}
        actionText="Choose your location now !"
        size="large"
      />
    );
  }

  return (
    <div className="weather-alerts">
      <div className="weather-alerts__container">
        <div className="weather-alerts__header">
          <AlertTriangle className="weather-alerts__header-icon" />
          <div className="weather-alerts__header-content">
            <h1 className="weather-alerts__title">Weather Alerts</h1>
            <p className="weather-alerts__subtitle">
              {alertsData.alerts.alert.length} active alert
              {alertsData.alerts.alert.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="weather-alerts__list">
          {alertsData.alerts?.alert?.length > 0 && (
            <>
              {alertsData.alerts.alert.map((alert, index) => {
                const effective = formatDateTime(alert.effective);
                const expires = formatDateTime(alert.expires);
                const areas = parseAreas(alert.areas);

                return (
                  <div
                    key={index}
                    className={`alert-card ${getSeverityColor(alert.severity)}`}
                  >
                    {/* Alert Header */}
                    <div className="alert-card__header">
                      <div className="alert-card__title-section">
                        {getEventTypeIcon(alert.event)}
                        <div className="alert-card__title-content">
                          <h2 className="alert-card__title">{alert.event}</h2>
                          <p className="alert-card__headline">
                            {alert.headline}
                          </p>
                        </div>
                      </div>
                      <div className="alert-card__badges">
                        <span
                          className={`alert-badge alert-badge--severity ${getSeverityColor(
                            alert.severity
                          )}`}
                        >
                          {alert.severity}
                        </span>
                        <span
                          className={`alert-badge alert-badge--urgency ${getUrgencyColor(
                            alert.urgency
                          )}`}
                        >
                          {alert.urgency}
                        </span>
                        <span className="alert-badge alert-badge--msgtype">
                          {alert.msgtype}
                        </span>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="alert-card__metadata">
                      <div className="alert-metadata__grid">
                        <div className="alert-metadata__item">
                          <Shield className="alert-metadata__icon" />
                          <div className="alert-metadata__content">
                            <span className="alert-metadata__label">
                              Category
                            </span>
                            <span className="alert-metadata__value">
                              {alert.category}
                            </span>
                          </div>
                        </div>
                        <div className="alert-metadata__item">
                          {getCertaintyIcon(alert.certainty)}
                          <div className="alert-metadata__content">
                            <span className="alert-metadata__label">
                              Certainty
                            </span>
                            <span className="alert-metadata__value">
                              {alert.certainty}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Timing */}
                    <div className="alert-card__timing">
                      <div className="alert-timing">
                        <div className="alert-timing__item">
                          <Calendar className="alert-timing__icon" />
                          <div className="alert-timing__content">
                            <span className="alert-timing__label">
                              Effective
                            </span>
                            <div className="alert-timing__datetime">
                              <span className="alert-timing__date">
                                {effective.date}
                              </span>
                              <span className="alert-timing__time">
                                {effective.time}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="alert-timing__item">
                          <Clock className="alert-timing__icon" />
                          <div className="alert-timing__content">
                            <span className="alert-timing__label">Expires</span>
                            <div className="alert-timing__datetime">
                              <span className="alert-timing__date">
                                {expires.date}
                              </span>
                              <span className="alert-timing__time">
                                {expires.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Areas */}
                    <div className="alert-card__areas">
                      <MapPin className="alert-areas__icon" />
                      <div className="alert-areas__content">
                        <span className="alert-areas__label">
                          Affected Areas
                        </span>
                        <div className="alert-areas__tags">
                          {areas.map((area, areaIndex) => (
                            <span key={areaIndex} className="alert-area-tag">
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Note */}
                    {alert.note && (
                      <div className="alert-card__note">
                        <FileText className="alert-note__icon" />
                        <div className="alert-note__content">
                          <span className="alert-note__label">Source</span>
                          <p className="alert-note__text">{alert.note}</p>
                        </div>
                      </div>
                    )}

                    {/* Description */}
                    <div className="alert-card__description">
                      <h3 className="alert-description__title">Description</h3>
                      <p className="alert-description__text">{alert.desc}</p>
                    </div>

                    {/* Instructions */}
                    <div className="alert-card__instruction">
                      <div className="alert-instruction__header">
                        <Info className="alert-instruction__icon" />
                        <h3 className="alert-instruction__title">
                          Safety Instructions
                        </h3>
                      </div>
                      <p className="alert-instruction__text">
                        {alert.instruction}
                      </p>
                    </div>
                  </div>
                );
              })}
            </>
          )}
          {alertsData.alerts?.alert?.length <= 0 && (
            <EmptyState
              title="Not alerts now"
              description="ALerts is empty !"
              type="products"
              actionText="Navigate to home !"
              size="large"
              action={handleChoose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherAlerts;
