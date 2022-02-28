import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";

import ViewBooks from './components/ViewBooks';
import AddBooks from './components/AddBooks';
import EditBooks from './components/EditBooks';

  const RoutingRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
              <Route path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>There's nothing here!</p>
                  </main>
                }
              />
                <Route path="/" element={<ViewBooks />} />
                <Route path="/addbooks" element={<AddBooks />} />
                <Route path="/editbooks/:id" element={<EditBooks />} />
            </Routes>
        </BrowserRouter>
    );

  }

  export default RoutingRouter;