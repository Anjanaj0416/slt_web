import { FC } from "react";
import Link from "next/link";
import { Box, Card, Chip, IconButton } from "@mui/material";
import East from "@mui/icons-material/East";
import format from "date-fns/format";
// GLOBAL CUSTOM COMPONENTS
import { Paragraph, Span } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
// CUSTOM DATA MODEL
import Ticket from "models/Ticket.model";

// ==============================================================
type Props = { ticket: Ticket };
// ==============================================================

const TicketCard: FC<Props> = ({ ticket }) => {
  const { id, slug, title, type, status, date, category } = ticket || {};

  return (
    <Link href={`/support-tickets/${slug}`} key={id}>
      <FlexBetween component={Card} px={2.5} py={2} mb={2}>
        <Box>
          <Paragraph mb={1.5} lineHeight={1}>
            {title}
          </Paragraph>

          <FlexBox alignItems="center" flexWrap="wrap" gap={1}>
            <Chip label={type} size="small" />
            <Chip label={status} size="small" color="success" />

            <Span className="pre" color="grey.600">
              {format(new Date(date), "MMM dd, yyyy")}
            </Span>

            <Span color="grey.600">{category}</Span>
          </FlexBox>
        </Box>

        <IconButton>
          <East
            fontSize="small"
            sx={{
              color: "grey.500",
              transform: ({ direction }) => `rotate(${direction === "rtl" ? "180deg" : "0deg"})`,
            }}
          />
        </IconButton>
      </FlexBetween>
    </Link>
  );
};

export default TicketCard;
