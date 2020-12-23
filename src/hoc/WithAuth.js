import { useAuth } from "./../hooks";

const WithAuth = (props) => useAuth(props) && props.children;

export default WithAuth;
