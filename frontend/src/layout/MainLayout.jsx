import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      {/* paddingTop compensa a Navbar fixed (68px) */}
      <main style={{ flex: 1, paddingTop: "68px" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;