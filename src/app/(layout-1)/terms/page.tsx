import { Box, Container, Divider, Typography } from "@mui/material";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box mb={4}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    {children}
  </Box>
);

export default function TermsAndConditions() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Terms and Conditions
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Last Updated: …… Insert Date ……
      </Typography>
      <Divider sx={{ my: 3 }} />

      <Section title="1. Introduction">
        <Typography>
          {`Welcome to …… (Name of the Site) …….., an online platform operated by
          Sri Lanka Telecom (Services) Limited (PB 914) ("SLTS"). These Terms
          and Conditions govern your use of ………………………., including its website,
          mobile application, and associated services (collectively, the
          "Site"). By accessing or using the Site, you acknowledge and agree to
          these Terms and Conditions. If you do not agree, you must refrain from
          using the Site.`}
        </Typography>
        <Typography mt={2}>
          SLTS reserves the right to modify these Terms and Conditions at any
          time without prior notice. Changes take effect immediately upon
          posting. Continued use of the Site following changes constitutes
          acceptance of the revised terms.
        </Typography>
      </Section>

      <Section title="2. Scope">
        <Typography>
          2.1. SLTS operates an e-commerce platform that facilitates
          transactions between Customers and Merchants. SLTS itself may also
          sell certain products and services through the Site.
        </Typography>
        <Typography>
          2.2. By placing an order, the Customer acknowledges entering into a
          legally binding contract with the Merchant. SLTS is not a party to
          contracts between Customers and Merchants unless explicitly stated.
        </Typography>
        <Typography>
          2.3. SLTS may subcontract certain services without prior notice.
        </Typography>
        <Typography>
          2.4. These Terms incorporate SLTS Platform Policies, which may be
          updated periodically.
        </Typography>
      </Section>

      <Section title="3. Interpretation & Definitions">
        <Typography>
          <strong>Customer:</strong> An individual or entity purchasing products
          or services on the Site.
        </Typography>
        <Typography>
          <strong>Merchant:</strong> A third-party seller offering products or
          services on the Site.
        </Typography>
        <Typography>
          <strong>Listed Price:</strong> The price of a product/service,
          inclusive of applicable Sri Lankan taxes and duties.
        </Typography>
        <Typography>
          <strong>Processing Time:</strong> The duration between order
          confirmation and dispatch.
        </Typography>
        <Typography>
          <strong>Return Policy:</strong> The terms governing product returns,
          refunds, and exchanges as listed by the Merchant.
        </Typography>
        <Typography>
          <strong>Intellectual Property:</strong> Includes patents, copyrights,
          trademarks, and other proprietary rights.
        </Typography>
      </Section>

      <Section title="4. Account Registration & Security">
        <Typography>
          4.1. Customers must register an account to use certain Site features.
          You are responsible for maintaining the confidentiality of your login
          credentials.
        </Typography>
        <Typography>
          4.2. Customers must provide accurate, up-to-date personal information
          and promptly update any changes.
        </Typography>
      </Section>

      <Section title="5. Privacy Policy">
        <Typography>
          5.1. SLTS is committed to protecting personal data in accordance with
          the Personal Data Protection Act, No. 9 of 2022. Our Privacy Policy
          governs how we collect, use, and disclose your personal information.
        </Typography>
      </Section>

      <Section title="6. Payment & Security">
        <Typography>
          6.1. Payments on the Site are processed via third-party payment
          gateways. SLTS does not store payment details.
        </Typography>
        <Typography>
          6.2. Customers must ensure they only make payments through authorized
          channels on the Site.
        </Typography>
        <Typography>
          6.3. SLTS complies with the Financial Transactions Reporting Act, No.
          6 of 2006, to prevent money laundering and fraud.
        </Typography>
      </Section>

      <Section title="7. Customer Protection & Returns">
        <Typography>
          7.1. Returns are subject to the policy set by the Merchant. SLTS may
          intervene if a dispute is unresolved within 7 days.
        </Typography>
        <Typography>
          7.2. SLTS reserves the right to blacklist fraudulent users.
        </Typography>
        <Typography>
          7.3. Merchants selling counterfeit goods will be liable for full
          refunds including shipping costs.
        </Typography>
      </Section>

      <Section title="8. Intellectual Property Rights">
        <Typography>
          8.1. The Site and its content are protected under the Intellectual
          Property Act No. 36 of 2003.
        </Typography>
        <Typography>
          8.2. Merchants must ensure listings do not infringe third-party
          rights. Report violations to SLTS at …… (contact details) ……
        </Typography>
      </Section>

      <Section title="9. Indemnity">
        <Typography>
          9.1. You agree to indemnify SLTS against claims arising from:
          <ul>
            <li>Your use of the Site in violation of these Terms</li>
            <li>Your breach of applicable law or third-party rights</li>
            <li>Disputes with Merchants or other users</li>
          </ul>
        </Typography>
        <Typography>
          9.2. This obligation survives the termination of your use of the Site.
        </Typography>
      </Section>

      <Section title="10. Limitation of Liability">
        <Typography>
          {`10.1. SLTS provides the Site "as is" and makes no warranties regarding
          product quality.`}
        </Typography>
        <Typography>
          10.2. SLTS is not liable for disputes, outages, or indirect losses.
        </Typography>
      </Section>

      <Section title="11. Governing Law & Dispute Resolution">
        <Typography>
          11.1. These Terms are governed by Sri Lankan law. Courts of Sri Lanka
          have exclusive jurisdiction.
        </Typography>
        <Typography>
          11.2. SLTS mediates disputes only when Merchants fail to resolve them.
        </Typography>
      </Section>

      <Section title="12. Amendments & Termination">
        <Typography>
          12.1. SLTS may update or terminate the Site or services at any time.
        </Typography>
        <Typography>
          12.2. Accounts may be suspended or terminated for violating these
          Terms.
        </Typography>
      </Section>

      <Section title="13. Contact Us">
        <Typography>
          For inquiries, complaints, or claims, contact SLTS at:
          <br />
          Email: …… (Insert Email) ……
          <br />
          Phone: …… (Insert Contact Number) ……
          <br />
          Address: …… (Insert Address) ……
        </Typography>
      </Section>

      <Typography variant="body2" mt={6}>
        This document is an electronic record under the Electronic Transactions
        Act, No. 19 of 2006, as amended, and does not require a physical or
        digital signature. By using this Site, you acknowledge and agree to
        abide by these Terms and Conditions.
      </Typography>
    </Container>
  );
}
