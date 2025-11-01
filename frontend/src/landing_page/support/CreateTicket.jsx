import React, { useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { supportData } from "./data";
import "./support.css";

const CreateTicket = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);

  const handleSectionClick = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
    setActiveTopic(null);
  };

  const handleTopicClick = (topic) => {
    setActiveTopic(topic);
  };

  return (
    <div className="support-container container mt-4 p-3">
      <div className="row m-5">
        {/* ==== LEFT SIDE ACCORDION ==== */}
        <div className="col-md-4 col-lg-6 sidebar">
          {supportData.slice(0, 6).map((section) => ( // show only first 2-3 for now
            <div key={section.id} className="accordion-item" style={{width:"100%"}}>
              <div
                className="accordion-header"
                onClick={() => handleSectionClick(section.id)}
              >
                <div className="header-left">
                  <i className={`${section.icon} icon`} ></i>
                  <span>{section.title}</span>
                </div>

                <i
                  className={`bi ${
                    activeSection === section.id
                      ? "bi-chevron-up"
                      : "bi-chevron-down"
                  } dropdown-arrow`}
                ></i>
              </div>

              {activeSection === section.id && (
                <ul className="accordion-content list-unstyled">
                  {section.topics.map((topic) => (
                    <li
                      key={topic.id}
                      className={`topic ${
                        activeTopic?.id === topic.id ? "active" : ""
                      }`}
                      onClick={() => handleTopicClick(topic)}
                    >
                      {topic.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* ==== RIGHT SIDE CONTENT ==== */}
        <div className="col-md-8 col-lg-6 content-area">
          {activeTopic ? (
            <>
              <Breadcrumb>
                <Breadcrumb.Item onClick={() => setActiveSection(null)}>
                  Home
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{activeTopic.title}</Breadcrumb.Item>
              </Breadcrumb>
              <h4 className="topic-title">{activeTopic.title}</h4>
              <ul className="faq-list">
                {activeTopic.faqs.map((faq, idx) => (
                  <li key={idx} className="faq-item">
                    {faq}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="placeholder-text">
              <h5>Select a topic to view support content</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
