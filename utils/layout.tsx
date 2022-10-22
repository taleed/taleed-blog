import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main style={{paddingTop: '130px'}}>{children}</main>
            <Footer />
        </>
    )
}
export default Layout;