-- Verificar se a tabela profiles existe, se não, criar
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT,
  user_role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Verificar se a coluna user_role existe, se não, criar
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'profiles' AND column_name = 'user_role') THEN
    ALTER TABLE profiles ADD COLUMN user_role TEXT DEFAULT 'user';
  END IF;
END $$;

-- Adicionar constraint para user_role se não existir
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage
    WHERE table_name = 'profiles' AND constraint_name = 'profiles_user_role_check'
  ) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_user_role_check 
      CHECK (user_role IN ('user', 'partner'));
  END IF;
END $$;

-- Criar perfis para usuários que não têm
INSERT INTO profiles (id, email, user_role, created_at)
SELECT 
  auth.users.id, 
  auth.users.email, 
  'user', 
  NOW()
FROM auth.users
LEFT JOIN profiles ON auth.users.id = profiles.id
WHERE profiles.id IS NULL;

-- Criar usuário especial se não existir
DO $$
DECLARE
  special_user_id UUID;
BEGIN
  -- Verificar se o usuário especial já existe
  SELECT id INTO special_user_id FROM auth.users WHERE email = 'luiza.fq@gmail.com';
  
  -- Se não existir, criar o usuário
  IF special_user_id IS NULL THEN
    -- Nota: Esta parte é apenas para referência, pois criar usuários diretamente via SQL
    -- não é recomendado. Use a API do Supabase para isso.
    RAISE NOTICE 'Usuário especial não encontrado. Use a API para criar.';
  ELSE
    -- Garantir que o perfil exista
    INSERT INTO profiles (id, email, name, user_role, created_at)
    VALUES (
      special_user_id,
      'luiza.fq@gmail.com',
      'Luiza',
      'user',
      NOW()
    )
    ON CONFLICT (id) DO UPDATE
    SET user_role = 'user', name = 'Luiza';
  END IF;
END $$;
