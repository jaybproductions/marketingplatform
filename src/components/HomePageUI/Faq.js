import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const Faq = () => {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div
      className="faq"
      id="faq"
      style={{ paddingTop: "20px", paddingBottom: "100px" }}
    >
      <h3 style={{ paddingBottom: "20px" }}>FAQ</h3>
      <div style={{ width: "60%", margin: "auto" }}>
        <Accordion
          square
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>What is "Marketing Platform"?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Marketing platform is a modern tool for managing your online
              business all from one place. You can host your website, organize
              your social calendar, and send text messages to your customers
              directly from the platform.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          square
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>
              Can I migrate my current site to this platform?{" "}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes! Wordpress has a variety of migration plugins available, and
              if you need any help doing this please reach out.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          square
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>Do I own all of my data?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes! You have full access to all data and if you ever decide you
              want to leave. We will help with all migrations.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Faq;
