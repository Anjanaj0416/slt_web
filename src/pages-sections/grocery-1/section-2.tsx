import { FC } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// CUSTOM ICON COMPONENTS
import appIcons from "icons";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { H4, Span } from "components/Typography";
// CUSTOM DATA MODEL
import Service from "models/Service.model";
// STYLED COMPONENT
import { ServiceCard } from "./styles";

// =============================================================
type Props = { id?: string; services: Service[] };
// =============================================================

const Section2: FC<Props> = ({ id, services }) => {
  const servicesData = services.slice(0, 4);

  return (
    <Container id={id} sx={{ pt: 12, pb: 8 }}>
      <Grid container spacing={3}>
        {servicesData?.map((item) => {
          const Icon = appIcons[item.icon];

          return (
            <Grid item lg={3} md={6} sm={6} xs={12} key={item.title}>
              <ServiceCard>
                <FlexBox alignItems="center" color="grey.600" fontSize="50px">
                  <Icon fontSize="50px" color="grey.600">
                    {item.icon}
                  </Icon>
                </FlexBox>

                <div>
                  <H4 color="grey.900" fontSize="1rem" fontWeight="700">
                    {item.title}
                  </H4>

                  <Span color="grey.600">{item.description}</Span>
                </div>
              </ServiceCard>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Section2;
