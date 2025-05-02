import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BookDetails from './pages/BookDetails'
import Checkout from './components/Checkout'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/books/:id" element={<BookDetails />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <footer className="bg-gray-100 py-6">
            <div className="container mx-auto px-4 text-center text-gray-600">
              © 2023 Bookstore. All rights reserved.
            </div>
          </footer>
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App