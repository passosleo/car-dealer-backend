INSERT INTO tb_roles (role_id, name, label, description, created_at, updated_at)
VALUES ('e4b50697-4e5c-406d-85df-9a1a4a913838', 'MANAGE_USERS', 'Gerenciar Usuários', 'Permite ao usuário gerenciar o cadastro e permissões de outros usuários', '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801')
ON CONFLICT (name) DO NOTHING;


INSERT INTO tb_roles (role_id, name, label, description, created_at, updated_at)
VALUES ('76aab760-8f34-4ad6-b931-d040b08c8f07', 'MANAGE_PROFILES', 'Gerenciar Perfis', 'Permite ao usuário criar e editar perfis de acesso', '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801')
ON CONFLICT (name) DO NOTHING;


INSERT INTO tb_roles (role_id, name, label, description, created_at, updated_at)
VALUES ('8be5e717-6315-461f-9b34-87cfec26832a', 'MANAGE_CATEGORIES', 'Gerenciar Categorias', 'Permite ao usuário administrar as categorias de veículos disponíveis no sistema', '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801')
ON CONFLICT (name) DO NOTHING;


INSERT INTO tb_roles (role_id, name, label, description, created_at, updated_at)
VALUES ('a1db845c-79c3-4211-9f28-7d6dd1d9e197', 'MANAGE_BRANDS', 'Gerenciar Marcas', 'Permite ao usuário cadastrar, editar e remover marcas de veículos', '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801')
ON CONFLICT (name) DO NOTHING;


INSERT INTO tb_roles (role_id, name, label, description, created_at, updated_at)
VALUES ('04bf8a60-1b42-49d1-ad8f-3731411f649a', 'MANAGE_VEHICLES', 'Gerenciar Veículos', 'Permite ao usuário gerenciar o cadastro e as informações dos veículos', '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801')
ON CONFLICT (name) DO NOTHING;


INSERT INTO tb_roles (role_id, name, label, description, created_at, updated_at)
VALUES ('e72d7095-0108-4308-931a-5fd29844dc65', 'MANAGE_BANNERS', 'Gerenciar Banners', 'Permite ao usuário criar e editar banners exibidos no site', '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801')
ON CONFLICT (name) DO NOTHING;


INSERT INTO tb_roles (role_id, name, label, description, created_at, updated_at)
VALUES ('33188533-75e1-4e5b-a606-64f03ce9b417', 'MANAGE_LAYOUT', 'Gerenciar Layout', 'Permite ao usuário configurar o layout e aparência do site', '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801')
ON CONFLICT (name) DO NOTHING;


INSERT INTO tb_roles (role_id, name, label, description, created_at, updated_at)
VALUES ('e61073ae-e5d2-44cd-b638-887fa3371d46', 'MANAGE_SELLERS', 'Gerenciar Vendedores', 'Permite ao usuário administrar o cadastro e informações dos vendedores', '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801')
ON CONFLICT (name) DO NOTHING;


INSERT INTO tb_profiles (profile_id, name, created_at, updated_at)
VALUES ('403328e6-fbb4-4bb3-85fe-f58a8bb1159f', 'Admin', '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801')
ON CONFLICT (name) DO NOTHING;


INSERT INTO tb_users (user_id, first_name, last_name, email, password, profile_id, created_at, updated_at, active)
VALUES ('c6feb69a-17f6-4137-8a4f-5266d8441f01', 'User', 'Example', 'user@example.com', '$2b$10$BLktZLeDKlbxmdsi14IOh.IP26o92fbuIs6Xbd7nlR4K1/0XwiJoS', '403328e6-fbb4-4bb3-85fe-f58a8bb1159f', '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801', true)
ON CONFLICT (email) DO NOTHING;


INSERT INTO tb_brands (brand_id, name, image_url, created_at, updated_at, active)
VALUES ('b6d0f0eb-7fcd-4224-b75a-b7b2505fc387', 'Honda', 'https://res.cloudinary.com/decwcec0e/image/upload/v1748718962/wakrpcfrhju5ddqn71rq.svg', '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801', true)
ON CONFLICT (name) DO NOTHING;


INSERT INTO tb_brands (brand_id, name, image_url, created_at, updated_at, active)
VALUES ('662d6618-cfc5-4bf4-83dd-4c8d13595fd3', 'Toyota', 'https://res.cloudinary.com/decwcec0e/image/upload/v1748718879/lobxpjkktxhfqmaozzha.svg', '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801', true)
ON CONFLICT (name) DO NOTHING;


INSERT INTO tb_brands (brand_id, name, image_url, created_at, updated_at, active)
VALUES ('7ef41002-8c30-49b5-8a15-aad91f3df675', 'Chevrolet', 'https://res.cloudinary.com/decwcec0e/image/upload/v1748719071/bjqceen9ixjubnyjl5sb.svg', '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801', true)
ON CONFLICT (name) DO NOTHING;


INSERT INTO tb_brands (brand_id, name, image_url, created_at, updated_at, active)
VALUES ('9b6732cf-95f3-48ee-ac87-48d1e0f7172a', 'Volkswagen', 'https://res.cloudinary.com/decwcec0e/image/upload/v1748718947/ucnfoxxecztxlwzpsurr.svg', '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801', true)
ON CONFLICT (name) DO NOTHING;


INSERT INTO tb_brands (brand_id, name, image_url, created_at, updated_at, active)
VALUES ('299d8489-9539-44dd-aba1-a9959056053e', 'Ford', 'https://res.cloudinary.com/decwcec0e/image/upload/v1748719017/tsv59b5szy3gmgs9teyf.svg', '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801', true)
ON CONFLICT (name) DO NOTHING;


INSERT INTO tb_layout_components (layout_component_id, label, name, page, description, position, created_at, updated_at, active)
VALUES ('bf8b86b8-2980-467c-8f36-d08c517534af', 'Top-Bar', 'top-bar', 'home', 'Configure a barra de mensagens rotativas', 1, '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801', true)
ON CONFLICT (name) DO NOTHING;


INSERT INTO tb_layout_top_bar_configs (layout_top_bar_config_id, layout_component_id, max_items, loop, delay, direction, jump, hide_on_mobile, hide_on_desktop, active, created_at, updated_at)
VALUES ('63f115f2-9216-42e7-bc03-57c58dc97bb1', 'bf8b86b8-2980-467c-8f36-d08c517534af', 10, true, 3000, 'ltr', false, false, false, true, '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801');


INSERT INTO tb_layout_top_bar_messages (layout_top_bar_message_id, layout_top_bar_config_id, message, link, position, active, created_at, updated_at)
VALUES ('b47a9c0c-afc4-4307-bdca-0bc8dfaa3185', '63f115f2-9216-42e7-bc03-57c58dc97bb1', 'Bem-vindo ao nosso site!', NULL, 1, true, '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801');


INSERT INTO tb_layout_top_bar_messages (layout_top_bar_message_id, layout_top_bar_config_id, message, link, position, active, created_at, updated_at)
VALUES ('d29cc688-5193-405f-bda9-c2704e4f7431', '63f115f2-9216-42e7-bc03-57c58dc97bb1', 'Confira nossas promoções especiais!', NULL, 2, true, '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801');


INSERT INTO tb_layout_top_bar_messages (layout_top_bar_message_id, layout_top_bar_config_id, message, link, position, active, created_at, updated_at)
VALUES ('85151f79-d3ad-4213-b068-2058830763fc', '63f115f2-9216-42e7-bc03-57c58dc97bb1', 'Veículos novos chegando em breve!', NULL, 3, true, '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801');


INSERT INTO tb_layout_components (layout_component_id, label, name, page, description, position, created_at, updated_at, active)
VALUES ('ca35e936-3aa6-45af-8254-87432b0b947f', 'Cabeçalho', 'header', 'home', 'Configure o cabeçalho do site', 2, '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801', true)
ON CONFLICT (name) DO NOTHING;


INSERT INTO tb_layout_components (layout_component_id, label, name, page, description, position, created_at, updated_at, active)
VALUES ('6e9ba03d-b631-4473-b915-c928d5030049', 'Banners', 'banners', 'home', 'Configure a barra de banners rotativos', 3, '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801', true)
ON CONFLICT (name) DO NOTHING;


INSERT INTO tb_layout_components (layout_component_id, label, name, page, description, position, created_at, updated_at, active)
VALUES ('5975aa07-bb71-4225-9a3b-151569315cd4', 'Info', 'info', 'home', 'Configure a seção de informações do site', 4, '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801', true)
ON CONFLICT (name) DO NOTHING;


INSERT INTO tb_layout_components (layout_component_id, label, name, page, description, position, created_at, updated_at, active)
VALUES ('9731a53c-9147-4916-9170-55f032c3248b', 'Shelf', 'footer', 'home', 'Configure o rodapé do site', 5, '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801', true)
ON CONFLICT (name) DO NOTHING;


INSERT INTO tb_layout_components (layout_component_id, label, name, page, description, position, created_at, updated_at, active)
VALUES ('78f9c923-7c0f-4457-8cdc-eac5cd13aeb6', 'Categorias', 'categories', 'home', 'Configure a seção de categorias de veículos', 6, '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801', true)
ON CONFLICT (name) DO NOTHING;


INSERT INTO tb_layout_components (layout_component_id, label, name, page, description, position, created_at, updated_at, active)
VALUES ('ed56b9a6-bff4-46ee-b239-2e145b32262d', 'Marcas', 'brands', 'home', 'Configure a seção de marcas de veículos', 7, '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801', true)
ON CONFLICT (name) DO NOTHING;


INSERT INTO tb_layout_components (layout_component_id, label, name, page, description, position, created_at, updated_at, active)
VALUES ('fd81ad2a-2eaa-40f8-85ca-cde1e798aed2', 'Vendedores', 'sellers', 'home', 'Configure a seção de vendedores', 8, '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801', true)
ON CONFLICT (name) DO NOTHING;


INSERT INTO tb_layout_components (layout_component_id, label, name, page, description, position, created_at, updated_at, active)
VALUES ('c574617e-0b5d-40e9-b3fb-2d1d6f74a46c', 'Localização', 'location', 'home', 'Configure a seção de localização da empresa e filiais', 9, '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801', true)
ON CONFLICT (name) DO NOTHING;


INSERT INTO tb_layout_components (layout_component_id, label, name, page, description, position, created_at, updated_at, active)
VALUES ('2e4b209a-d75b-4880-bef3-bb72f0071500', 'Rodapé', 'footer', 'home', 'Configure o rodapé do site', 10, '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801', true)
ON CONFLICT (name) DO NOTHING;

INSERT INTO tb_profiles_roles (profile_role_id, profile_id, role_id, created_at)
VALUES 
  ('f08d94f0-780f-47c6-9e42-0d9b1e03fcaa', '403328e6-fbb4-4bb3-85fe-f58a8bb1159f', 'e4b50697-4e5c-406d-85df-9a1a4a913838', '2025-07-06T22:28:57.173801'), -- MANAGE_USERS
  ('9fef28d5-0188-40db-82d2-31d16fdf0e6d', '403328e6-fbb4-4bb3-85fe-f58a8bb1159f', '76aab760-8f34-4ad6-b931-d040b08c8f07', '2025-07-06T22:28:57.173801'), -- MANAGE_PROFILES
  ('fd6efc8c-8ce2-4404-83ec-96f273bc356c', '403328e6-fbb4-4bb3-85fe-f58a8bb1159f', '8be5e717-6315-461f-9b34-87cfec26832a', '2025-07-06T22:28:57.173801'), -- MANAGE_CATEGORIES
  ('db771be5-218e-4d42-b2a0-8d897fd62cfc', '403328e6-fbb4-4bb3-85fe-f58a8bb1159f', 'a1db845c-79c3-4211-9f28-7d6dd1d9e197', '2025-07-06T22:28:57.173801'), -- MANAGE_BRANDS
  ('69e9b05d-8b65-4d25-b40c-6bc69354cc0e', '403328e6-fbb4-4bb3-85fe-f58a8bb1159f', '04bf8a60-1b42-49d1-ad8f-3731411f649a', '2025-07-06T22:28:57.173801'), -- MANAGE_VEHICLES
  ('cb633e06-d2d7-4b7d-bc77-80ffb7bb2c0d', '403328e6-fbb4-4bb3-85fe-f58a8bb1159f', 'e72d7095-0108-4308-931a-5fd29844dc65', '2025-07-06T22:28:57.173801'), -- MANAGE_BANNERS
  ('dbf13b2a-c292-4a78-b2f1-d3c62119c7dc', '403328e6-fbb4-4bb3-85fe-f58a8bb1159f', '33188533-75e1-4e5b-a606-64f03ce9b417', '2025-07-06T22:28:57.173801'), -- MANAGE_LAYOUT
  ('d098d93b-cf33-4b83-9b94-7b5ef8a05df1', '403328e6-fbb4-4bb3-85fe-f58a8bb1159f', 'e61073ae-e5d2-44cd-b638-887fa3371d46', '2025-07-06T22:28:57.173801')  -- MANAGE_SELLERS
ON CONFLICT DO NOTHING;

INSERT INTO tb_categories (category_id, name, image_url, created_at, updated_at, active)
VALUES 
  ('97c5c660-5f16-4c71-b417-a9de0a5a01f7', 'Sedan', 'https://res.cloudinary.com/decwcec0e/image/upload/v1748720378/w8a0vfdb25linz2yoyjk.png', '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801', true),
  ('0c3253b3-8f16-45ef-b1e7-fb7ad2cf4e85', 'Hatch', 'https://res.cloudinary.com/decwcec0e/image/upload/v1748720328/i3hjk0x89cf0ex99qmpe.png', '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801', true),
  ('203f80f2-0f21-4e2b-b9ee-e902c9a3722d', 'SUV', 'https://res.cloudinary.com/decwcec0e/image/upload/v1748720278/ab6jajyo4vsfipelvk72.png', '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801', true),
  ('a3e91e9f-2482-4f3c-b527-6f33a62368f0', 'Pickup', 'https://res.cloudinary.com/decwcec0e/image/upload/v1748720160/chdcpsm2jwwfowgyro5u.png', '2025-07-06T22:28:57.173801', '2025-07-06T22:28:57.173801', true)
ON CONFLICT (name) DO NOTHING;

-- Inserção do veículo
INSERT INTO tb_vehicles (
  vehicle_id, model, year, plate, description, price, mileage, color,
  transmission, fuel_type, doors, seats, horsepower, torque, drive_train,
  brand_id, category_id, created_at, updated_at, active
)
VALUES (
  '87bde38d-28aa-46d5-9602-ea4e3a3cf763', 
  'Volkswagen Gol 2018 MSI Manual',
  2018,
  'ABC-1234',
  'Volkswagen Gol 2018 em ótimo estado, completo, com baixa quilometragem.',
  34990.00,
  86000,
  'Prata',
  'MANUAL',
  'FLEX',
  4,
  5,
  84,
  12.5,
  'FWD',
  '9b6732cf-95f3-48ee-ac87-48d1e0f7172a',
  '0c3253b3-8f16-45ef-b1e7-fb7ad2cf4e85',
  '2025-07-06T22:28:57.173801',
  '2025-07-06T22:28:57.173801',
  true
);

INSERT INTO tb_vehicles_images (vehicle_image_id, vehicle_id, image_url, created_at)
VALUES 
  ('d7bffbfd-771e-4d5e-bb68-fad47c7ad387', '87bde38d-28aa-46d5-9602-ea4e3a3cf763', 'https://res.cloudinary.com/decwcec0e/image/upload/v1748718337/owohaupfzmrsh6hfe6ak.webp', '2025-07-06T22:28:57.173801'),
  ('ea6cd38a-0f65-41c6-9d3d-b02f4a11f715', '87bde38d-28aa-46d5-9602-ea4e3a3cf763', 'https://res.cloudinary.com/decwcec0e/image/upload/v1748718337/ulqqghhos01p3ulnkg1d.webp', '2025-07-06T22:28:57.173801');

INSERT INTO tb_sellers (
  seller_id, first_name, last_name, email, phone, image_url, custom_message,
  created_at, updated_at, active
)
VALUES (
  'f1c54e88-3a63-4e37-8c69-7807f7b37f8a',
  'João',
  'Silva',
  'joao.silva@revenda.com',
  '(51) 99999-0000',
  'https://res.cloudinary.com/decwcec0e/image/upload/v1748719180/tovcp0cmtad0trzeypuy.jpg',
  'Fale comigo direto no WhatsApp para saber mais sobre os veículos!',
  '2025-07-06T22:28:57.173801',
  '2025-07-06T22:28:57.173801',
  true
);

INSERT INTO tb_banners (
  banner_id, title, image_desktop_url, image_mobile_url,
  start_at, end_at, active, created_at, updated_at
)
VALUES
  (
    '18f649aa-c2d6-4fe4-a229-02e4d2030d10',
    'Promoção de Janeiro',
    'https://res.cloudinary.com/decwcec0e/image/upload/v1751846370/23122024_Janeiro_1920x1080_xullak.webp',
    'https://res.cloudinary.com/decwcec0e/image/upload/v1751846370/23122024_Janeiro_1920x1080_xullak.webp',
    '2025-07-01T00:00:00',
    '2025-07-31T23:59:59',
    true,
    '2025-07-06T22:28:57.173801',
    '2025-07-06T22:28:57.173801'
  ),
  (
    'c4151b6b-e55a-4d88-91fa-52b8797b5482',
    'Oferta Amarok',
    'https://res.cloudinary.com/decwcec0e/image/upload/v1751846353/amarok_banner2_1920x1080_vqwrxt.webp',
    'https://res.cloudinary.com/decwcec0e/image/upload/v1751846353/amarok_banner2_1920x1080_vqwrxt.webp',
    '2025-07-01T00:00:00',
    '2025-07-31T23:59:59',
    true,
    '2025-07-06T22:28:57.173801',
    '2025-07-06T22:28:57.173801'
  ),
  (
    '79a21be0-f0dc-476b-b1ad-cfb05cc19f92',
    'Feirão de Ofertas',
    'https://res.cloudinary.com/decwcec0e/image/upload/v1748717689/qhghoiudlidimzdtgaeg.webp',
    'https://res.cloudinary.com/decwcec0e/image/upload/v1748717689/qhghoiudlidimzdtgaeg.webp',
    '2025-07-01T00:00:00',
    '2025-07-31T23:59:59',
    true,
    '2025-07-06T22:28:57.173801',
    '2025-07-06T22:28:57.173801'
  );
