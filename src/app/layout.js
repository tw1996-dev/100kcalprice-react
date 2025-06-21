import "./globals.css";
import Link from "next/link";

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
            <li>
              <Link className="navigation-link" href="/">Home</Link>
            </li>
            <li>
              <Link className="navigation-link" href="/calculator">Calculator🧮</Link>
            </li>
            <li>
              <Link className="navigation-link" href="/instructions">How use?</Link>
            </li>
          </ul>
        </nav>
        {children}

        <footer>
          {/* Empty footer */}
        </footer>
      </body>
    </html>
  );
}
