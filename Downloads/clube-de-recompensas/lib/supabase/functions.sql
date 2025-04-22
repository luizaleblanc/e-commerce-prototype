-- Função para atualizar os pontos do usuário
CREATE OR REPLACE FUNCTION update_user_points(p_user_id TEXT, p_points INT)
RETURNS VOID AS $$
BEGIN
  -- Atualiza o saldo de pontos do usuário
  UPDATE users
  SET points = points + p_points
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- Função para adicionar coluna role se não existir
CREATE OR REPLACE FUNCTION add_role_column()
RETURNS VOID AS $$
BEGIN
  -- Verificar se a coluna role existe
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'role'
  ) THEN
    -- Adicionar a coluna role
    ALTER TABLE profiles ADD COLUMN role TEXT NOT NULL DEFAULT 'user';
    
    -- Adicionar constraint
    ALTER TABLE profiles ADD CONSTRAINT profiles_role_check 
      CHECK (role IN ('user', 'partner'));
  END IF;
END;
$$ LANGUAGE plpgsql;
