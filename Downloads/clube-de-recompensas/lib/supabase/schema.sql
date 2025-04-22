-- Criar tabela de perfis se não existir
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  user_role TEXT NOT NULL DEFAULT 'user' CHECK (user_role IN ('user', 'partner')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Adicionar a coluna user_role se não existir (para compatibilidade com código existente)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'profiles' AND column_name = 'user_role') THEN
    ALTER TABLE profiles ADD COLUMN user_role TEXT NOT NULL DEFAULT 'user' CHECK (user_role IN ('user', 'partner'));
  END IF;
END $$;

-- Criar função para atualizar o timestamp de updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar trigger para atualizar o timestamp de updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Criar índice para busca por email
CREATE INDEX IF NOT EXISTS profiles_email_idx ON profiles(email);

-- Criar índice para busca por role
CREATE INDEX IF NOT EXISTS profiles_role_idx ON profiles(user_role);
