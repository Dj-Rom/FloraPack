import './App.css';
import { type InitialPackList } from './components/FormForListPackaging.tsx';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store.tsx';
import PrimarySearchAppBar from './components/Navi.tsx';
import SelectLanguage from './components/SelectLanguage.tsx';
import SelectPackList from './components/SelectPackList.tsx';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage.tsx';
import PackInformationPage from './pages/PackInformationPage.tsx';
import { Alert, Snackbar } from '@mui/material';
import { clearAlert } from './redux/slices/alert.tsx';
import { useDispatch } from 'react-redux';
import { useToggleFocusMode } from './helpers/uiHelpers.tsx';


export interface PackagingListInterface {
  id: number;
  title: Date;
  nameCompany: string;
  description: InitialPackList;
}

function App() {
  useToggleFocusMode()
  const isSelectLanguage = useSelector((state: RootState) => state.navi.isSelectLanguage);
  const isSelectPackList = useSelector((state: RootState) => state.navi.isSelectPackList);
  const alert = useSelector((state: RootState) => state.alert)
  const dispatch = useDispatch()
  const open = Boolean(alert.message);

  const handleClose = () => {
    dispatch(clearAlert());
  };
  return (
    <>
      {alert?.message && alert?.type && (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity={alert.type as any} sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        </Snackbar>
      )}

      <header>
        <PrimarySearchAppBar />
        {isSelectLanguage && <SelectLanguage />}
        {isSelectPackList && <SelectPackList />}
      </header>

      <main>
        <Routes>
          <Route path="FloraPack/" element={<MainPage />} />
          <Route path="FloraPack/information" element={<PackInformationPage />} />
        </Routes>
      </main>

      <footer>
        <p>&copy; Dj-Rom, Union Europe 2025</p>
      </footer>
    </>
  );
}

export default App;
