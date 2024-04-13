import { Link, NavLink, useLocation } from 'react-router-dom'
import styles from './Header.module.scss'
import ThemeChange from '../../ui/themeChange/ThemeChange'
import LoginLogOut from '../../ui/loginLogOut/LoginLogOut'
import { MenuOutlined } from '@ant-design/icons'
import { Drawer } from 'antd'
import { useState } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { useWindowWidth } from '../../hooks/useResize'

const Header = () => {
  const [visible, setVisible] = useState(false)
  const { value: theme } = useAppSelector((state) => state.theme)
  const windowWidth = useWindowWidth()
  const location = useLocation()

  const menuItems = [
    { path: '/', name: 'Главная' },
    { path: '/favorites', name: 'Избранные фильмы' },
    { path: '/random-film', name: 'Рандомный фильм' },
  ]

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }
  return (
    <header className={styles.header}>
      <Link to={'/'} className={`link ${styles.logo}`}>
        Logo
      </Link>
      <nav className={styles.nav}>
        {windowWidth > 600 ? (
          <>
            {menuItems.map((el) => (
              <NavLink to={el.path} key={el.path} className={({ isActive }) => (isActive ? 'link active' : 'link')}>
                {el.name}
              </NavLink>
            ))}
          </>
        ) : (
          <>
            {menuItems.map((item) =>
              item.path !== '/' && location.pathname !== item.path ? (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => (isActive ? `link active` : 'link')}
                >
                  {item.name}
                </NavLink>
              ) : null,
            )}
          </>
        )}
      </nav>

      <>
        <MenuOutlined onClick={showDrawer} />
        <Drawer
          title='Menu'
          placement='top'
          onClose={onClose}
          open={visible}
          className={theme === 'dark' ? `${styles.dark}` : ''}
        >
          <div className={styles.header__right}>
            {windowWidth < 600 && (
              <NavLink to={'/'} className={({ isActive }) => (isActive ? 'link active' : 'link')} onClick={onClose}>
                Главная
              </NavLink>
            )}
            <LoginLogOut onClick={onClose} />
            <ThemeChange />
          </div>
        </Drawer>
      </>
    </header>
  )
}

export default Header
