import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { useTranslation } from 'react-i18next'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Starfield from './components/Starfield'
import PanelTransition from './components/PanelTransition'
import ChatWidget from './components/ChatWidget'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Skills = lazy(() => import('./pages/Skills'))
const Projects = lazy(() => import('./pages/Projects'))
const Trajectory = lazy(() => import('./pages/Trajectory'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function AnimatedRoutes() {
  const location = useLocation()
  const baseKey = location.pathname.split('/')[1] ?? ''
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={baseKey}>
        <Route
          path="/"
          element={
            <PanelTransition>
              <Home />
            </PanelTransition>
          }
        />
        <Route
          path="/sobre"
          element={
            <PanelTransition>
              <About />
            </PanelTransition>
          }
        />
        <Route
          path="/skills"
          element={
            <PanelTransition>
              <Skills />
            </PanelTransition>
          }
        />
        <Route
          path="/skills/:planetId"
          element={
            <PanelTransition>
              <Skills />
            </PanelTransition>
          }
        />
        <Route
          path="/projetos"
          element={
            <PanelTransition>
              <Projects />
            </PanelTransition>
          }
        />
        <Route
          path="/projetos/:slug"
          element={
            <PanelTransition>
              <Projects />
            </PanelTransition>
          }
        />
        <Route
          path="/trajetoria"
          element={
            <PanelTransition>
              <Trajectory />
            </PanelTransition>
          }
        />
        <Route
          path="/contato"
          element={
            <PanelTransition>
              <Contact />
            </PanelTransition>
          }
        />
        <Route
          path="*"
          element={
            <PanelTransition>
              <NotFound />
            </PanelTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const { t } = useTranslation()
  return (
    <BrowserRouter>
      <Starfield />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-white">
        {t('skipLink')}
      </a>
      <Nav />
      <ChatWidget />
      <main id="main" className="flex min-h-screen flex-col pt-16">
        <div className="flex-1">
          <Suspense fallback={null}>
            <AnimatedRoutes />
          </Suspense>
        </div>
        <Footer />
      </main>
    </BrowserRouter>
  )
}