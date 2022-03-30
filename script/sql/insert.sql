INSERT INTO utilisateur (mail_user, nom, prenom, groupe_sanguin, genre, adresse, ville, telephone, password_user)
VALUES
    ('tom.holland@gmail.com', 'holland', 'tom', 'O+', 'Male', '2 rue de mouchy', 'versailles', '0622563254', '$2a$10$ElyXp0uhXRtvQSsfDr4WzOU0Z/BN210H8rH.5UZRqAx5DegV9KcVu'),
    ('theomolinatti@gmail.com', 'molinatti', 'théophile', 'AB-', 'Male', '8 rue gabriel', 'versailles', '0121707388', '$2a$10$EFIVfbsVQd7bgxghD2QuC.GSMU7cFZx6hOwgxHhZeSoMxzp9nqfxW'),
    ('isa.malino@gmail.com', 'malino', 'isa', 'AB-', 'Female', '8 rue rataud', 'paris', '0644751439', '$2a$10$9gUK7w7avI3POOpr7Z1pn.oYsGF3giq9dTAC9ggPqlDEmkTFi1uHi'),
    ('jeremy.soundy@gmail.com', 'soundy', 'jeremy', 'B-', 'Male', '4 rue deguerry', 'paris', '0785332680', '$2a$10$aBVvrO/SOClTtEvH1kiicuWLXIlIfewWlXqfXMQIZqUwl/nmh8nC2');

INSERT INTO hopital (nom, adresse, ville, mail, telephone)
VALUES
    ('hopital bretonneau', '23 rue joseph de maistre', 'paris', 'hopital_bretonneau@gmail.com', '0153111800'),
    ('hopital vaugirard', '10 rue vaugelas', 'paris', 'hopital_vaugirard@gmail.com', '0140458000'),
    ('hopital saint-antoine', '184 rue faubourg saint-antoine', 'paris', 'hopital_saint-antoine@gmail.com', '0149282000'),
    ('hopital sainte-perine', '11 rue chardon lagache', 'paris', 'hopital-sainte-perine', '0144963131'),
    ('hopital lariboisiere', '2 rue ambroise pare', 'paris', 'hopital_lariboisiere@gmail.com', '0149956565');

INSERT INTO commentaire (texte, mail_user)
VALUES
    ('super application!', 'jeremy.soundy@gmail.com'),
    ('rendez-vous rapide, aucun problème', 'tom.holland@gmail.com');

