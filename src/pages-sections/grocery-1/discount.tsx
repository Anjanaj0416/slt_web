import Link from "next/link";
import { useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import { H1, Paragraph } from "components/Typography";

// STYLED COMPONENT
const Container = styled(Card)(({ theme }) => ({
  padding: "50px",
  background: "#efefef",
  transition: "all 0.3s",
  [theme.breakpoints.down("sm")]: {
    margin: "auto",
    padding: "30px 20px",
    "& .content": {
      marginBottom: 30,
      textAlign: "center",
      "& h1": { fontSize: 25 },
    },
  },
}));

const DiscountSection = () => {
  const router = useRouter();

  return (
    <Container>
      <Link href="/sale-page-1">
        <Grid container>
          <Grid className="content" item sm={7} xs={12}>
            <Paragraph>Till 10 Dec, 2021</Paragraph>
            <H1>25% Special Off Today</H1>
            <H1>Only for Vegetables</H1>
            <Button
              color="primary"
              variant="contained"
              sx={{ mt: 5, fontSize: "12px" }}
              onClick={() => router.push("/sale-page-1")}
            >
              Shop Now
            </Button>
          </Grid>

          <Grid item sm={5}>
            <LazyImage
              width={900}
              height={528}
              alt="discount"
              src="/assets/images/Groceries Shop/vagitable.png"
            />
          </Grid>
        </Grid>
      </Link>
    </Container>
  );
};

export default DiscountSection;
