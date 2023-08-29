import React  from 'react';
import { Container, Menu, Button } from 'semantic-ui-react';

export default function NavBar() {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Outdoor Competition Database
                </Menu.Item>
                <Menu.Item name='Competitions' />
                <Menu.Item>
                    <Button positive content='Create Competition' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}