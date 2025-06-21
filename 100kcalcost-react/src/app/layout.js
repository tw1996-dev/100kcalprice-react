import "./globals.css";

export const metadata = {
  title: "100 kcal Cost Calculator",
  description: "Calculate and compare the cost of 100 calories for various food products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav id="main-nav" aria-label="Main navigation">
          <ul>
            <li><a className="navigation-link" href="/">Home</a></li>
            <li><a className="navigation-link" href="/calculator">Calculator🧮</a></li>
            <li><a className="navigation-link" href="/instructions">How use?</a></li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}