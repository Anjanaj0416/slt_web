import { FC } from "react";
import format from "date-fns/format";
import Card from "@mui/material/Card";
import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
import { Small, Span } from "components/Typography";
// CUSTOM DATA MODEL
import { User1 } from "models/User.model";

// ==============================================================
type Props = { user: User1 };
// ==============================================================

const UserInfo: FC<Props> = ({ user }) => {
  const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        mt: 3,
        display: "flex",
        flexWrap: "wrap",
        p: "0.75rem 1.5rem",
        alignItems: "center",
        justifyContent: "space-between",
        ...(downMd && {
          alignItems: "start",
          flexDirection: "column",
          justifyContent: "flex-start",
        }),
      }}
    >
      <TableRowItem title="First Name" value={user?.firstName} />
      <TableRowItem title="Last Name" value={user?.lastName} />
      <TableRowEmail value={user?.email?.toLocaleLowerCase()} />
      <TableRowItem title="Phone" value={user?.phone || "-"} />
      <TableRowItem
        title="Birth date"
        value={
          user?.birthDay && user?.birthDay !== ""
            ? format(new Date(user?.birthDay), "dd MMM, yyyy")
            : "-"
        }
      />
    </Card>
  );
};

function TableRowItem({ title, value }: { title: string; value: string }) {
  return (
    <FlexBox flexDirection="column" p={1}>
      <Small color="grey.600" mb={0.5} textTransform="capitalize">
        {title}
      </Small>

      <Span textTransform="capitalize">{value}</Span>
    </FlexBox>
  );
}

function TableRowEmail({ value }: { value: string }) {
  return (
    <FlexBox flexDirection="column" p={1}>
      <Small color="grey.600" mb={0.5} textTransform="capitalize">
        Email
      </Small>

      <Span>{value}</Span>
    </FlexBox>
  );
}

export default UserInfo;
