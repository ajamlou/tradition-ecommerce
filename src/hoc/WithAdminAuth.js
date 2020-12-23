import { useAdminAuth } from "./../hooks";

const WithAdminAuth = (props) => useAdminAuth(props) && props.children;

export default WithAdminAuth;
