-- D&D Monster Management System - Azure SQL Database Schema
--
-- Instructions:
-- 1. Connect to your Azure SQL Database using SQL Server Management Studio or Azure Data Studio
-- 2. Run this script to create all necessary tables and seed initial data
-- 3. Update your .env file with the database password

-- Create monsters table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'monsters')
BEGIN
    CREATE TABLE monsters (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(255) NOT NULL,
        size NVARCHAR(50) NOT NULL,
        type NVARCHAR(100) NOT NULL,
        alignment NVARCHAR(100),
        armor_class INT NOT NULL,
        hit_points INT NOT NULL,
        hit_dice NVARCHAR(50) NOT NULL,
        speed NVARCHAR(MAX) NOT NULL DEFAULT '{"walk": 30}',
        str INT NOT NULL DEFAULT 10,
        dex INT NOT NULL DEFAULT 10,
        con INT NOT NULL DEFAULT 10,
        int INT NOT NULL DEFAULT 10,
        wis INT NOT NULL DEFAULT 10,
        cha INT NOT NULL DEFAULT 10,
        saving_throws NVARCHAR(MAX) NOT NULL DEFAULT '{}',
        skills NVARCHAR(MAX) NOT NULL DEFAULT '{}',
        damage_vulnerabilities NVARCHAR(MAX) DEFAULT '',
        damage_resistances NVARCHAR(MAX) DEFAULT '',
        damage_immunities NVARCHAR(MAX) DEFAULT '',
        condition_immunities NVARCHAR(MAX) DEFAULT '',
        senses NVARCHAR(MAX) DEFAULT '',
        languages NVARCHAR(MAX) DEFAULT '',
        challenge_rating NVARCHAR(20) NOT NULL,
        experience_points INT NOT NULL DEFAULT 0,
        special_abilities NVARCHAR(MAX) DEFAULT '[]',
        actions NVARCHAR(MAX) DEFAULT '[]',
        reactions NVARCHAR(MAX) DEFAULT '[]',
        legendary_actions NVARCHAR(MAX) DEFAULT '[]',
        description NVARCHAR(MAX) DEFAULT '',
        is_custom BIT DEFAULT 1,
        created_at DATETIME2 DEFAULT GETDATE(),
        updated_at DATETIME2 DEFAULT GETDATE()
    );
END
GO

-- Create roles table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'roles')
BEGIN
    CREATE TABLE roles (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(255) UNIQUE NOT NULL,
        description NVARCHAR(MAX) NOT NULL,
        stat_modifiers NVARCHAR(MAX) DEFAULT '{}',
        feature_additions NVARCHAR(MAX) DEFAULT '[]',
        created_at DATETIME2 DEFAULT GETDATE()
    );
END
GO

-- Create monster_variants table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'monster_variants')
BEGIN
    CREATE TABLE monster_variants (
        id INT IDENTITY(1,1) PRIMARY KEY,
        base_monster_id INT NOT NULL,
        role_id INT NOT NULL,
        custom_name NVARCHAR(255),
        stat_overrides NVARCHAR(MAX) DEFAULT '{}',
        created_at DATETIME2 DEFAULT GETDATE(),
        CONSTRAINT FK_monster_variants_monsters FOREIGN KEY (base_monster_id)
            REFERENCES monsters(id) ON DELETE CASCADE,
        CONSTRAINT FK_monster_variants_roles FOREIGN KEY (role_id)
            REFERENCES roles(id) ON DELETE CASCADE,
        CONSTRAINT UQ_monster_variant UNIQUE (base_monster_id, role_id)
    );
END
GO

-- Insert default roles if they don't exist
IF NOT EXISTS (SELECT * FROM roles WHERE name = 'Guard')
BEGIN
    INSERT INTO roles (name, description, stat_modifiers, feature_additions) VALUES
    (
        'Guard',
        'A defensive role focused on protection and holding positions',
        '{"armor_class": 2, "hit_points": 10}',
        '[{"name": "Sentinel", "description": "This creature has advantage on opportunity attacks and can use its reaction to make a melee attack against a creature that moves within 5 feet of an ally."}]'
    );
END
GO

IF NOT EXISTS (SELECT * FROM roles WHERE name = 'Scout')
BEGIN
    INSERT INTO roles (name, description, stat_modifiers, feature_additions) VALUES
    (
        'Scout',
        'A reconnaissance role focused on speed and perception',
        '{"dex": 2, "speed": {"walk": 10}}',
        '[{"name": "Keen Senses", "description": "This creature has advantage on Wisdom (Perception) checks that rely on sight or hearing."}, {"name": "Nimble Escape", "description": "The creature can take the Disengage or Hide action as a bonus action on each of its turns."}]'
    );
END
GO

IF NOT EXISTS (SELECT * FROM roles WHERE name = 'Brute')
BEGIN
    INSERT INTO roles (name, description, stat_modifiers, feature_additions) VALUES
    (
        'Brute',
        'A heavy-hitting role focused on damage output',
        '{"str": 2, "hit_points": 15}',
        '[{"name": "Brutal Critical", "description": "When this creature scores a critical hit with a melee weapon attack, it rolls one additional weapon damage die."}]'
    );
END
GO

IF NOT EXISTS (SELECT * FROM roles WHERE name = 'Caster')
BEGIN
    INSERT INTO roles (name, description, stat_modifiers, feature_additions) VALUES
    (
        'Caster',
        'A magic-focused role with spellcasting abilities',
        '{"int": 2, "wis": 2}',
        '[{"name": "Spellcasting", "description": "This creature can cast spells using Intelligence or Wisdom as its spellcasting ability (spell save DC 13, +5 to hit with spell attacks). It knows a selection of cantrips and 1st-level spells appropriate to its challenge rating."}]'
    );
END
GO

PRINT 'Database schema created successfully!';
PRINT 'Default roles (Guard, Scout, Brute, Caster) have been added.';
PRINT 'You can now start using the Monster Manager application.';
