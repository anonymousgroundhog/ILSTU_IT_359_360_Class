// Default IR/DR Plan Data Model

const IR_STAGES = [
  {
    name: "Preparation",
    description: "Establish incident response capability, tools, and training.",
    checklist: [
      { text: "Develop and document incident response procedures", completed: false },
      { text: "Establish incident response team structure", completed: false },
      { text: "Implement security monitoring and alerting", completed: false },
      { text: "Deploy antivirus and malware protection", completed: false },
      { text: "Conduct incident response training and drills", completed: false },
    ],
  },
  {
    name: "Detection & Analysis",
    description: "Detect, analyze, and determine the scope of an incident.",
    checklist: [
      { text: "Monitor security alerts and logs", completed: false },
      { text: "Investigate suspicious activities", completed: false },
      { text: "Determine incident type and severity", completed: false },
      { text: "Document initial findings", completed: false },
      { text: "Activate incident response team", completed: false },
    ],
  },
  {
    name: "Containment",
    description: "Stop the attack and limit its scope and impact.",
    checklist: [
      { text: "Isolate affected systems from network", completed: false },
      { text: "Disable compromised accounts", completed: false },
      { text: "Block malicious IP addresses and domains", completed: false },
      { text: "Preserve evidence for forensics", completed: false },
      { text: "Prevent further lateral movement", completed: false },
    ],
  },
  {
    name: "Eradication",
    description: "Remove the threat and restore systems to a known good state.",
    checklist: [
      { text: "Remove malware and backdoors", completed: false },
      { text: "Patch vulnerabilities that were exploited", completed: false },
      { text: "Change compromised credentials", completed: false },
      { text: "Rebuild systems from clean media if necessary", completed: false },
      { text: "Verify threat removal before restoration", completed: false },
    ],
  },
  {
    name: "Recovery",
    description: "Restore systems to normal operations and verify they function correctly.",
    checklist: [
      { text: "Restore data from clean backups", completed: false },
      { text: "Restore systems to production", completed: false },
      { text: "Monitor systems closely for recurrence", completed: false },
      { text: "Communicate recovery status to stakeholders", completed: false },
      { text: "Document final incident status", completed: false },
    ],
  },
];

const DR_STAGES = [
  {
    name: "Prevention",
    description: "Implement preventive measures to avoid disasters.",
    checklist: [
      { text: "Identify critical systems and data", completed: false },
      { text: "Implement redundant systems and backups", completed: false },
      { text: "Deploy failover infrastructure", completed: false },
      { text: "Test backup and recovery procedures regularly", completed: false },
      { text: "Document all critical system dependencies", completed: false },
    ],
  },
  {
    name: "Detection",
    description: "Detect when a disaster has occurred.",
    checklist: [
      { text: "Monitor system availability and performance", completed: false },
      { text: "Establish alerting for critical service failures", completed: false },
      { text: "Document incident occurrence time", completed: false },
      { text: "Assess disaster impact and scope", completed: false },
      { text: "Activate disaster recovery team", completed: false },
    ],
  },
  {
    name: "Recovery",
    description: "Restore systems and services to operational status.",
    checklist: [
      { text: "Activate failover systems and backups", completed: false },
      { text: "Verify data integrity after recovery", completed: false },
      { text: "Restore service to users", completed: false },
      { text: "Monitor recovered systems for stability", completed: false },
      { text: "Document recovery time and RTO/RPO achievement", completed: false },
    ],
  },
  {
    name: "Post-Recovery",
    description: "Restore full operations and improve resilience.",
    checklist: [
      { text: "Synchronize recovered systems with primary", completed: false },
      { text: "Return to normal operations", completed: false },
      { text: "Review disaster response effectiveness", completed: false },
      { text: "Update disaster recovery procedures", completed: false },
      { text: "Communicate lessons learned to team", completed: false },
    ],
  },
];

function makeDefaultPlan() {
  return {
    org_name: "",
    industry: "",
    critical_systems: [],
    team: [],
    ir_stages: JSON.parse(JSON.stringify(IR_STAGES)), // Deep copy
    dr_stages: JSON.parse(JSON.stringify(DR_STAGES)), // Deep copy
    rto: "",
    rpo: "",
  };
}

function planFromJSON(json) {
  if (typeof json === "string") {
    return JSON.parse(json);
  }
  return json;
}

// Export for use in pages
if (typeof module !== "undefined" && module.exports) {
  module.exports = { makeDefaultPlan, planFromJSON, IR_STAGES, DR_STAGES };
}
