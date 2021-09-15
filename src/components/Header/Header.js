import React from 'react';
import { Container, Grid, GridColumn, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import RightHeader from './RightHeader';
import Logo from 'assets/png/instaclone.png';
import Search from './Search';
import './Header.scss';

export default function Header() {
  return (
    <div className='header'>
      <Container>
        <Grid>
          <GridColumn width={3} className='header__logo'>
            <Link to='/'>
              <Image src={Logo} alt='Instaclone' />
            </Link>
          </GridColumn>
          <GridColumn width={10}>
            <Search />
          </GridColumn>
          <GridColumn width={3}>
            <RightHeader />
          </GridColumn>
        </Grid>
      </Container>
    </div>
  );
}
