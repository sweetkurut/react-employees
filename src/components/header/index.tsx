import { Button, Layout, Space, Typography } from 'antd'
import styles from './index.module.css'
import { TeamOutlined } from '@ant-design/icons'

const Header = () => {
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Button type="primary">Click</Button>
      </Space>
    </Layout.Header>
  )
}

export default Header