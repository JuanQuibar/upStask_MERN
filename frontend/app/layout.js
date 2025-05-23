import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from './context/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'UpTask',
  description: 'Tablero de tareas',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 min-h-screen`}>
        <AuthProvider>
          {/* <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center ">

            <div className="md:w-2/3 lg:w-2/5">
              

            </div>

          </main> */}
              {children}
        </AuthProvider>
      </body>
    </html>
  )
} 
