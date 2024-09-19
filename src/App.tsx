import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import { BoardElement } from './components/BoardElement.tsx';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';
import { theme } from './config/theme.ts';
import { NotificationServiceProvider } from './context/NotificationService.tsx';
import { QuickActionProvider } from './context/QuickActionService.tsx';
import { ViewerNavBar } from './features/viewer/ViewerNavBar.tsx';
import { Authenticate } from './pages/Authenticate.tsx';
import { Portfolio } from './pages/Portfolio.tsx';
import { PreviewResume } from './pages/PreviewResume.tsx';
import { Profile } from './pages/Profile.tsx';
import { Project } from './pages/Project.tsx';
import { Resume } from './pages/Resume.tsx';
import { ViewerPortfolio } from './pages/viewer/ViewerPortfolio.tsx';
import { ViewerProject } from './pages/viewer/ViewerProject.tsx';
import { ViewerResume } from './pages/viewer/ViewerResume.tsx';

export default function App() {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <NotificationServiceProvider>
          <QuickActionProvider>
            <CssBaseline>
              <main style={{ height: '100vh', overflowY: 'auto' }}>
                <Routes>
                  <Route
                    path={'/'}
                    element={<ProtectedRoute routeType={'admin'} />}
                  >
                    <Route
                      path={'/'}
                      element={
                        <BoardElement
                          elementName={'Portfolio'}
                          element={<Portfolio />}
                        />
                      }
                    />
                    <Route
                      path={'/portfolio/:projectId'}
                      element={
                        <BoardElement
                          elementName={'Project'}
                          element={<Project />}
                        />
                      }
                    />

                    <Route
                      path={'/resume'}
                      element={
                        <BoardElement
                          elementName={'Resume'}
                          element={<Resume />}
                        />
                      }
                    />
                    <Route
                      path={'/resume/preview'}
                      element={
                        <BoardElement
                          elementName={'Resume preview'}
                          element={<PreviewResume />}
                        />
                      }
                    />

                    <Route
                      path={'/profile'}
                      element={
                        <BoardElement
                          elementName={'Profile'}
                          element={<Profile />}
                        />
                      }
                    />
                  </Route>

                  <Route
                    path={'/'}
                    element={<ProtectedRoute routeType={'auth'} />}
                  >
                    <Route path={'/connection'} element={<Authenticate />} />
                  </Route>

                  <Route path={'/viewer/:username'}>
                    <Route
                      path={'/viewer/:username'}
                      element={
                        <ViewerNavBar>
                          <ViewerPortfolio />
                        </ViewerNavBar>
                      }
                    />
                    <Route
                      path={'/viewer/:username/portfolio'}
                      element={
                        <ViewerNavBar>
                          <ViewerPortfolio />
                        </ViewerNavBar>
                      }
                    />
                    <Route
                      path={'/viewer/:username/portfolio/:projectId'}
                      element={
                        <ViewerNavBar>
                          <ViewerProject />
                        </ViewerNavBar>
                      }
                    />
                    <Route
                      path={'/viewer/:username/resume'}
                      element={
                        <ViewerNavBar>
                          <ViewerResume />
                        </ViewerNavBar>
                      }
                    />
                  </Route>
                </Routes>
              </main>
            </CssBaseline>
          </QuickActionProvider>
        </NotificationServiceProvider>
      </ThemeProvider>
    </div>
  );
}
