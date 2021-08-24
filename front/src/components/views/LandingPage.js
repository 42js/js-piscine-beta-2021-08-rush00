import { Breadcrumb, Layout } from "antd";
import "antd/dist/antd.css";
import NavBar from "../utils/NavBar";

const { Content } = Layout;

function LandingPage() {

    return (
        <Layout style={{height: '100%'}}>
            <NavBar />
            <Content sytle={{ margin: "0 16px" }}>
                <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
            </Content>
        </Layout>
    );
}

export default LandingPage;
