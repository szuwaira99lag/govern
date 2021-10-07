import styled from 'styled-components';
import { Main } from '@aragon/ui';
import { Switch } from 'react-router-dom';
import { ApmRoute } from '@elastic/apm-rum-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import CreateDao from 'containers/CreateDao/CreateDao';
import NoDaoFound from '../DAO/NoDaoFound';
import scrollToTop from 'utils/scrollToId';
import DaoHomePage from 'containers/DAO/DaoHomePage';
import { trackPage } from 'services/analytics';
import ConsoleMainPage from 'containers/Console/ConsoleMainPage';
import { ModalsProvider } from 'containers/HomePage/ModalsContext';

const Container = styled.div`
  display: grid;
  padding: 0px 16px 0px 16px;
  grid-gap: 16px;
  grid-template-areas:
    'body'
    'footer';
`;

const BodyArea = styled.div`
  grid-area: body;
  min-height: 90vh;
`;

const FooterArea = styled.div`
  grid-area: footer;
`;

const HomePage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    trackPage(pathname);

    // scroll to top on path change
    scrollToTop();
  }, [pathname]);

  return (
    <ModalsProvider>
      <Main theme="light" toastProps={{ top: true, position: 'center' }}>
        <Container>
          <BodyArea>
            <Header />
            <Switch>
              <ApmRoute exact path="/" component={ConsoleMainPage} />
              <ApmRoute exact path="/create-dao" component={CreateDao} />
              <ApmRoute exact path="/daos/not-found" component={NoDaoFound} />
              <ApmRoute path="/daos/:daoName/" component={DaoHomePage} />

              {/* TODO: add missing catch all not found page */}
            </Switch>
          </BodyArea>
          <FooterArea>
            <Footer />
          </FooterArea>
        </Container>
      </Main>
    </ModalsProvider>
  );
};

export default HomePage;
