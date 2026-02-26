import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ padding: "20px" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;