import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./view/Home";
import NotFound from "./view/NotFound";
import Local from "./view/Local";
import Login from "./view/Login";
import Register from "./view/Register";
import Perfil from "./view/Perfil";
import { useAuth } from "./contexts/auth";

interface PrivateProps {
  Item: React.ComponentType;
}

const Private: React.FC<PrivateProps> = ({ Item }) => {
  const auth = useAuth();

  return auth.email ? <Item /> : <Login />;
};

const Loged: React.FC<PrivateProps> = ({ Item }) => {
  const auth = useAuth();

  return !auth.email ? <Item /> : <Home />;
};

const AppRouter = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/perfil" element={<Private Item={Perfil} />} />

        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Loged Item={Register} />} />
        <Route path="/login" element={<Loged Item={Login} />} />
        <Route path="/local/:local" element={<Local />} />
        <Route path="/local/*" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
};

export default AppRouter;
