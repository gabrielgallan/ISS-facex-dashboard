import { Button } from "@/components/ui/button"
import { ThemeProvider } from "./components/theme-provider"

import './index.css'
import { HomePage } from "./app"

export function App() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
    
  )
}