import { Link } from "react-router-dom";
import Title from "../components/ui/title";
import Frame from "../components/util/frame";

export default function NotFound() {
  return (
    <Frame addClass="wide">
      <Title addClass="mb">Page Not Found</Title>
      <Link to="/" className="btn">
        Back to Home
      </Link>
    </Frame>
  );
}
