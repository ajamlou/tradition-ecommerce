import { useAuth } from "./../hooks";
import { withRouter } from "react-router-dom";

const WithAuth = (props) => useAuth(props) && props.children;

export default withRouter(WithAuth);
