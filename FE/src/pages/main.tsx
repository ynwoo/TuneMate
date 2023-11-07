import Dashboard from "../components/player/Dashboards.tsx";

const accessToken =
  "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhYjFiNGI3Zi1hYmIyLTRiZjEtOTIwZi1iNDM3MjMzYjRmNDciLCJleHAiOjE2OTkyNjQwMjAsImlzcyI6IlR1bmVtYXRlIn0.vJrRdYnAr0YqSzfsfb6Eoj7F032Ee_K4rNKmy7oAc6mwqrbLVTB3ADOxtAjewWTA";
const mainPage = () => {
  return (
    <div>
      {/* <Dashboard /> */}
      <Dashboard accessToken={accessToken} />;
    </div>
  );
};

export default mainPage;
