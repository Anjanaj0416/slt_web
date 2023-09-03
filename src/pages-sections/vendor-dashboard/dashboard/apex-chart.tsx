import dynamic from "next/dynamic";
import { Props } from "react-apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ApexChart = (props: Props) => <ReactApexChart {...props} />;
export default ApexChart;
