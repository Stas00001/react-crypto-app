import { Layout, Select, Button, Space, Modal, Drawer } from 'antd';
import { useEffect, useState } from 'react';

import CoinInfoModal from './CoinInfoModal';
import { useCrypto } from '../../context/crypto-context';
import AddAssetForm from './AddAssetForm';
const headerStyle = {
  width: '100%',
  textAlign: 'center',
  color: '#fff',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const AppHeader = () => {
  const [select, setSelect] = useState(false);
  const [coin, setCoin] = useState(null);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { crypto } = useCrypto();

  useEffect(() => {
    const keypress = (evt) => {
      if (evt.key === '/') {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener('keypress', keypress);
    return () => document.removeEventListener('keypress', keypress);
  }, []);

  const handleSelect = (value) => {
    setCoin(crypto.find((coin) => coin.id === value));
    setModal(true);
  };

  return (
    <Layout.Header style={headerStyle}>
      <Select
        mode='multiple'
        style={{ width: 250 }}
        open={select}
        onClick={() => setSelect((prev) => !prev)}
        onSelect={handleSelect}
        value='press / to  open'
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />{' '}
            {option.data.label}
          </Space>
        )}
      />
      <Button type='primary' onClick={() => setDrawer(true)}>
        Add Asset
      </Button>
      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>
      <Drawer
        width={600}
        title='Basic Drawer'
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose
        on
      >
        <AddAssetForm onClose ={() => setDrawer(false)}/>
      </Drawer>
    </Layout.Header>
  );
};

export default AppHeader;
