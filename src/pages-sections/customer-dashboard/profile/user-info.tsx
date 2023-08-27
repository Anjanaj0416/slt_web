import { FC } from "react";
import format from "date-fns/format";
import { Theme, useMediaQuery } from "@mui/material";
// GLOBAL CUSTOM COMPONENTS
import TableRow from "components/TableRow";
import FlexBox from "components/flex-box/flex-box";
import { Small, Span } from "components/Typography";
// CUSTOM DATA MODEL
import User from "models/User.model";

// ==============================================================
type Props = { user: User };
// ==============================================================

const UserInfo: FC<Props> = ({ user }) => {
  const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  return (
    <TableRow
      sx={{
        mt: 3,
        cursor: "auto",
        p: "0.75rem 1.5rem",
        ...(downMd && {
          alignItems: "start",
          flexDirection: "column",
          justifyContent: "flex-start",
        }),
      }}
    >
      <TableRowItem title="First Name" value={user.name.firstName} />
      <TableRowItem title="Last Name" value={user.name.lastName} />
      <TableRowItem title="Email" value={user.email} />
      <TableRowItem title="Phone" value={user.phone} />
      <TableRowItem title="Birth date" value={format(new Date(user.dateOfBirth), "dd MMM, yyyy")} />
    </TableRow>
  );
};

function TableRowItem({ title, value }: { title: string; value: string }) {
  return (
    <FlexBox flexDirection="column" p={1}>
      <Small color="grey.600" mb={0.5}>
        {title}
      </Small>

      <Span>{value}</Span>
    </FlexBox>
  );
}

export default UserInfo;
