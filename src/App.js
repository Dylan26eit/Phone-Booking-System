import Header from "./my-components/Header"
import Home from "./my-components/Home"
import Footer from "./my-components/Footer"
import AdvancedJS from './my-components/AdvancedJS';//import AdvancedJS Component
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import FAQ from './my-components/FAQ';//import FAQ Component
import Invoice from "./my-components/Invoice";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


function app() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/advancedJS" element={<AdvancedJS />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/invoice" element={<Invoice />} />
          </Routes>
          <Footer />
        </Router>
      </DndProvider>
    </>
  )
}

export default app