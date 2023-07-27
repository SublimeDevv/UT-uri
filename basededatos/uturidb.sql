CREATE DATABASE uturidb;
USE uturidb;

CREATE TABLE Categorias (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Descripcion TEXT NOT NULL,
    Imagen VARCHAR(30) NOT NULL,
    Estatus INT DEFAULT 1
);

CREATE TABLE Subcategorias (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Descripcion TEXT NOT NULL,
    CategoriaID INT NOT NULL,
    CONSTRAINT FK_Subcategorias_Categorias FOREIGN KEY (CategoriaID) REFERENCES Categorias(Id)
);

Select * from VW_Obtener_Etiquetas;

ALTER TABLE Subcategorias ADD COLUMN Estatus INT DEFAULT 1;

DELIMITER //
CREATE PROCEDURE SP_OcultarSubcategoria(
    IN subcategoriaId INT
)
BEGIN
    UPDATE Subcategorias SET Estatus = 0 WHERE Id = subcategoriaId;
END //

SELECT * FROM Subcategorias;




CREATE PROCEDURE SP_ModificarSubcategorias (IN p_nombre VARCHAR(50), p_descripcion TEXT)
BEGIN

CREATE TABLE Lugares (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Informacion TEXT NOT NULL,
    Imagenes JSON NOT NULL,
    Estatus INT DEFAULT 1,
    Latitud DECIMAL(10, 8) NOT NULL,    
    Longitud DECIMAL(11, 8) NOT NULL,

);

CREATE TABLE Detalles (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion TEXT NOT NULL,
    Personas INT NOT NULL,
    Precio DECIMAL(7, 2) NOT NULL,
    LugarID INT NOT NULL,
    CONSTRAINT FK_Detalles_Lugares FOREIGN KEY (LugarID) REFERENCES Lugares(Id)
);

CREATE TABLE Roles (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(30) NOT NULL,
    Descripcion TEXT
);

CREATE TABLE Usuarios (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Apellido VARCHAR(100) NOT NULL,
    Correo VARCHAR(100) NOT NULL,
    Contrasenia VARCHAR(100) NOT NULL,
    Avatar VARCHAR(150) DEFAULT 'default_avatar.jpg' NOT NULL,
    RolID INT DEFAULT 2,
    Fecha_Creacion DATE NOT NULL,
    CONSTRAINT FK_Usuarios_Roles FOREIGN KEY (RolID) REFERENCES Roles(Id)
);

CREATE TABLE LugaresSubcategorias (
    LugarID INT,
    SubcategoriaID INT,
    PRIMARY KEY (LugarID, SubcategoriaID),
    CONSTRAINT FK_LugarSub_Lugar FOREIGN KEY (LugarID) REFERENCES Lugares(Id),
    CONSTRAINT FK_LugarSub_Subcategoria FOREIGN KEY (SubcategoriaID) REFERENCES Subcategorias(Id)
);

CREATE TABLE Reservas (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UsuarioID INT NOT NULL,
    DetallesID INT NOT NULL,
    Fecha DATE NOT NULL,
    CONSTRAINT FK_Compras_Usuario FOREIGN KEY (UsuarioID) REFERENCES Usuarios(Id),
    CONSTRAINT FK_Compras_Detalles FOREIGN KEY (DetallesID) REFERENCES Detalles(Id)
);

CREATE TABLE PuntuacionLugares (
    Puntuacion INT NOT NULL,
    UsuarioID INT NOT NULL,
    LugarID INT NOT NULL,
    CONSTRAINT FK_Puntuacion_Lugar FOREIGN KEY (LugarID) REFERENCES Lugares(Id),
    CONSTRAINT FK_Puntuacion_Usuario FOREIGN KEY (UsuarioID) REFERENCES Usuarios(Id)
);

-- Inserción de los datos en las tablas.
INSERT INTO Categorias(Nombre, Descripcion, Imagen)
VALUES (
        'Naturales',
        'El estado de Quintana Roo es una de las regiones más bellas del mundo; por algo es el estado mexicano más atractivo para el turismo nacional e internacional y marco de Cancún, uno de los sitios más visitados en todo el planeta. Esta ha deslumbrado por su riqueza natural y la belleza de sus playas, lagos y lagunas.',
        't_Naturaleza.png'
    ),
    (
        'Aventura',
        'El estado de Quintana Roo es una de las regiones más bellas del mundo; por algo es el estado mexicano más atractivo para el turismo nacional e internacional y marco de Cancún, uno de los sitios más visitados en todo el planeta. Esta ha deslumbrado por su riqueza natural y la belleza de sus playas, lagos y lagunas.',
        't_Aventura.jpg'
    ),
    (
        'Historicos',
        'Los sitios arqueológicos de la Riviera Maya ocupan un lugar privilegiado en los tours culturales, pero no son los únicos lugares de interés donde los turistas sedientos de conocimiento se deleitan con el arte y la historia. Los tours culturales son una excelente manera de aprender más sobre esta magnífica región cuya historia es tan rica como fascinante, tan antigua como contemporánea.',
        't_Historiaa.jpg'
    );
    INSERT INTO Categorias(Nombre, Descripcion, Imagen)
VALUES 
    (
        'Historicos',
        'Los sitios arqueológicos de la Riviera Maya ocupan un lugar privilegiado en los tours culturales, pero no son los únicos lugares de interés donde los turistas sedientos de conocimiento se deleitan con el arte y la historia. Los tours culturales son una excelente manera de aprender más sobre esta magnífica región cuya historia es tan rica como fascinante, tan antigua como contemporánea.',
        't_Historiaa.jpg'
    );
INSERT INTO Subcategorias(Nombre, Descripcion)
VALUES (
        'Playas',
        'Disfruta de las hermosas playas de Quintana Roo y sus aguas cristalinas.'
    ),
    (
        'Cenotes',
        'Explora los mágicos cenotes de la región y sumérgete en sus aguas frescas.'
    ),
    (
        'Reservas Naturales',
        'Admira la exuberante flora y fauna en las reservas naturales de Quintana Roo.'
    );
INSERT INTO Subcategorias(Nombre, Descripcion)
VALUES (
        'Tirolesas',
        'Experimenta la emoción de volar a través de la jungla en tirolesas.'
    ),
    (
        'Senderismo',
        'Recorre los senderos naturales y disfruta de la belleza escénica de la región.'
    ),
    (
        'Avistamiento de Vida Silvestre',
        'Observa de cerca la vida silvestre en su hábitat natural.'
    );
INSERT INTO Subcategorias(Nombre, Descripcion)
VALUES (
        'Sitios Arqueológicos',
        'Explora las antiguas ciudades mayas y descubre su historia y arquitectura.'
    ),
    (
        'Museos',
        'Sumérgete en la cultura y el arte visitando los museos de Quintana Roo.'
    ),
    (
        'Pueblos Mágicos',
        'Descubre los encantadores pueblos con historia y tradiciones únicas.'
    );
INSERT INTO Lugares(Nombre, Informacion, Imagenes, CategoriaID, Latitud, Longitud)
VALUES (
        'Cozumel',
        'Cozumel es la isla más grande del Caribe Mexicano y la tercera más grande de México. Rica en historia, vestigios mayas y maravillas naturales; un auténtico paraíso en medio del mar con playas blancas, bellos atardeceres y famosa a nivel mundial por sus arrecifes de coral. Es un destino de aventura y relajación en donde se realizan todo tipo de actividades en impresionantes escenarios naturales.',
        '["listas/Cozumel.jpg", "listas/cozumel1.jpg", "listas/cozumel2.jpeg", "listas/cozumel3.jpg"]', 1, 20.5101, -86.9489
    ),
    (
        'Playa del Carmen',
        'Situada dentro de la Riviera Maya, Playa del Carmen se encuentra en el corazón del Caribe Mexicano. Para los amantes de la naturaleza y aventura, Playa del Carmen y sus alrededores ofrecen una gran variedad de actividades que puedes realizar en alguno de sus emocionantes parques naturales y temáticos; desde observación de aves, paseos en cuatrimoto y circuitos de tirolesas a través de la exuberante jungla maya.',
        '["listas/PlayaDCarmen.jpg", "listas/playa1.jpg", "listas/playa2.jpg", "listas/playa3.jpg"]', 1, 20.6274, -87.07987
    ),
    (
        'Holbox',
        'La isla de Holbox es una de las maravillas naturales que puedes encontrar en el extremo norte de la Península de Yucatán. Ubicada en el lugar donde las aguas del Golfo de México y del mar Caribe se encuentran, esta isla es un pequeño paraíso de sol, playa y naturaleza, un lugar mágico en el que parece que el tiempo pasa de una manera distinta. Holbox es parte del Área de Protección de Flora y Fauna Yum Balam, un santuario natural en donde reina la tranquilidad y en donde la armonía entre turismo y naturaleza es un factor clave.',
        '["listas/holbox.jpg", "listas/holbox1.jpg","listas/holbox2.jpg","listas/holbox3.jpg"]', 1, 21.530833, -87.286111
    ),
    (
        'Tulum',
        'El Pueblo Mágico de Tulum es un punto obligado y la mejor muestra del encanto maya gracias a sus ruinas situadas al borde del Mar Caribe; además de ser la única zona arqueológica que se asienta a la orilla de un acantilado, bajo el cual se encuentra la playa del Paraíso, una de las mejores y más hermosas playas de la Riviera Maya y muy probablemente, la más retratada. Es el lugar perfecto para disfrutar de la paz y la tranquilidad. Con hermosas playas de arena blanca, lagunas, cenotes y cavernas que muestran en todo su esplendor su belleza.',
        '["listas/tulum.jpg", "listas/tt1.jpg", "listas/tt2.jpg", "listas/tt3.jpeg"]', 1, 20.2117300, -87.4632500
    ),
    (
        'Bacalar',
        'Bacalar o Laguna de los Siete Colores, es una laguna ubicada en el estado de Quintana Roo, muy cerca de Chetumal, la capital del estado. Su nombre viene del maya Bakhalal que significa “cerca o rodeado de carrizos”. De forma circular, la laguna es poco profunda lo que permite nadar cómodamente. Alrededor se encuentran establecidas tanto casas privadas como pequeñas posadas que permiten acceso a la laguna.',
        '["listas/bacalar.jpeg", "listas/bacalar1.jpg", "listas/bacalar2.jpg", "listas/bacalar3.jpg"]', 1, 18.6810900, -88.3933300
    ),
    (
        'Bucear en Cenotes',
        'Es bien sabido que el estado está rodeado de formaciones de agua llamadas “cenotes", las cuales además de su belleza, ofrecen a los buzos la oportunidad de sumergirse en las entrañas de la Tierra, explorar un mundo diferente, flotar en cavernas llenas de agua transparente, decoración y efectos de la luz del sol. En su gran mayoría los cenotes no son de gran profundidad, sin embargo, la certificación de buzo de aguas abiertas es necesaria para poder llevar a cabo esta actividad.',
        '["listas/bucear.jpeg", "listas/bucear1.jpg", "listas/bucear2.jpg", "listas/bucear3.jpg"]', 2, 20.588941570, -87.135200500
    ),
    (
        'Bicicleta de Aventura',
        'Estamos seguros que te encantará realizar esta actividad, donde además de disfrutar de un rato de adrenalina también podrás limpiar tus pulmones respirando el aire puro de la selva.  Son varios los lugares donde se puede realizar esta actividad, uno de ellos es el poblado La Unión, o si quieres algo más cercano a los centros turísticos, Playa del Carmen es la opción.',
        '["listas/pasear_bici.jpeg", "listas/bicicleta1.jpg", "listas/bicicleta2.jpeg", "listas/bicicleta3.jpg"]', 2, 20.6295586, -87.0738851
    ),
    (
        'Nado con Tiburones Toro',
        'Descubre la grandeza de estos animales marinos buceando sin jaula y a unos escasos metros de ellos. Esta actividad la puedes realizar en Playa del Carmen en los meses de Noviembre a Marzo cuando los escualos se acercan a estas playas con el fin de tener a sus crías en los manglares de la zona. ¿Estás listo para vivir la adrenalina a nivel extremo?',
        '["listas/nado_tiburones.jpeg", "listas/nado1.jpg", "listas/nado2.jpg", "listas/nado3.jpg"]', 2, 20.6274000, -87.0798700
    ),
    (
        'Hacer Kayak',
        'Localizada dentro de la Biósfera de Sian Ka´an a 20 minutos de Tulum, se encuentra un pequeño poblado llamado Muyil donde la exuberante selva se mezcla con la belleza de la laguna del mismo nombre que son el escenario perfecto para hacer kayak. Si eres amante de la naturaleza y de la exploración ¡tienes que vivir esta experiencia!',
        '["listas/kayac.jpeg", "listas/kayak1.jpg", "listas/kayak2.jpg", "listas/kayak3.jpg"]', 2, 19.5, -87.61666667
    ),
    (
        'Manejar coches anfibios en Xplor',
        'A 15 minutos de Playa del Carmen se localiza Xplor, un parque de aventura donde podrás manejar estos singulares coches anfibios y con ellos adentrarte al corazón de la selva, admirar la naturaleza y disfrutar de mucha diversión.',
        '["listas/manejar_selva.jpg", "listas/coche1.jpg", "listas/coche2.jpg", "listas/coche3.jpg"]', 2, 20.5938187, -87.1224711191181
    ),
    (
        'Caracol Punta-Sur',
        'Al noroeste del faro de Punta Celarain se encuentra la llamada Tumba del Caracol, un vestigio arqueológico dedicado a Ixchel, deidad de la cultura maya. Esta estructura, construida por los mayas en el periodo posclásico está dotado de una cúpula que a su vez estuvo recubierta de caracoles marinos que producían un zumbido con los vientos fuertes. Funcionaba el conjunto como una especie de alarma, advirtiendo sobre la intensidad de los vientos en la isla.',
        '["listas/Caracol-Punta.jpg", "listas/punta1.jpg", "listas/punta2.jpg", "listas/punta3.jpg"]', 3,  19.40534,  -99.165707
    ),
    (
        'El Meco',
        'El Meco está localizado en la costa norte de Quintana Roo, justo en la bahía de Isla Mujeres, por lo que es muy probable que haya tenido un papel relevante en la ruta de navegación maya a lo largo de toda costa. El edificio conocido como “El Castillo” es el más alto de la región y desde su cima puede tenerse una visión privilegiada de la isla de Cancún y sus zonas aledañas, lo que debió conferirle una importancia estratégica en la época prehispánica. Su puerto fue el centro de una importante actividad comercial y desde allí seguramente se controló el acceso hacia la vecina Isla Mujeres, que funcionó como uno de los santuarios más importantes del Postclásico tardío.',
        '["listas/el_meco.jpg", "listas/meco1.jpg", "listas/meco2.jpeg", "listas/meco3.jpg"]', 3, 21.21115425, -86.8039306827064
    ),
    (
        'Zona Arqueologica de Tulum',
        'Tulum fue una ciudad amurallada de la cultura maya ubicada en el Estado de Quintana Roo, en el sureste de México, en la costa del mar Caribe. Es en la actualidad un gran atractivo turístico de la Riviera Maya y junto a ella se encuentra la moderna población del mismo nombre, Tulum. La ciudad maya se encuentra dentro del Parque Nacional Tulum. Por los numerosos registros en murales y otros trabajos encontrados en los edificios de la ciudad, se tiene considerado que Tulum fue un importante centro de culto para el llamado "dios descendente".',
        '["listas/tulumm.jpeg", "listas/tuluum1.jpg", "listas/tuluum2.jpg", "listas/tuluum3.jpg"]', 3, 21.16055556, -86.8475
    ),
    (
        'Zona Arqueologica de Coba',
        'Cobá es un yacimiento arqueológico de la cultura maya precolombina, localizado en el sureste de México, en el territorio que hoy ocupa el estado de Quintana Roo, unos noventa kilómetros al este de Chichén Itzá y unos cuarenta al noroeste de Tulum. Cobá es sin duda el asentamiento más importante del noreste de la península de Yucatán comparable en tamaño e importancia a Chichén Itzá, su rival y enemigo a lo largo de gran parte de su historia prehispánica. Tiene una extensión de poco más de 70 kilómetros cuadrados y una red de 45 caminos que comunica a los diversos conjuntos del sitio, así como a Cobá con otras comunidades menores y seguramente dependientes de su dominio. ',
        '["listas/coba.jpg", "listas/coba1.jpg", "listas/coba2.png", "listas/coba3.jpg"]', 3, 19.4933, -87.7283
    ),
    (
        'Zona Arqueologica de San Gervasio',
        'San Gervasio es el sitio más grande e importante de Cozumel, a la fecha es el único que ha sido objeto de un programa permanente de conservación e investigación arqueológica. Las razones por las cuales este lugar fue elegido para la ubicación del asentamiento más grande de la isla resultan obvias cuando se observa que se localiza sobre el manto acuífero más grande y permanente que seguramente garantizó la subsistencia de sus habitantes. Los trabajos arqueológicos muestran que el asentamiento prehispánico fue fundado alrededor del año 300 d.C., cuando era un pequeño asentamiento, aunque ya era el más grande de la isla.',
        '["listas/Gervasio.jpg", "listas/gervasio1.jpg", "listas/gervasio2.jpg", "listas/gervasio3.jpg"]' , 3, 20.50077195, -86.8465188
    );
INSERT INTO Roles (Nombre, Descripcion)
VALUES ('Administrador', 'Acceso total al sistema');
INSERT INTO Roles (Nombre, Descripcion)
VALUES ('Usuario', 'Acceso limitado al sistema');
INSERT INTO LugaresSubcategorias (LugarID, SubcategoriaID)
VALUES (1, 1),
    -- Cozumel - Playas
    (1, 3),
    -- Cozumel - Reservas Naturales
    (2, 1),
    -- Playa del Carmen - Playas
    (2, 2),
    -- Playa del Carmen - Cenotes
    (3, 1),
    -- Holbox - PlayasP
    (3, 3),
    -- Holbox - Reservas Naturales
    (4, 1),
    -- Tulum - Playas
    (4, 2),
    -- Tulum - Cenotes
    (5, 1),
    -- Bacalar - Playas
    (6, 2),
    -- Bucear en Cenotes - Senderismo
    (7, 2),
    -- Bicicleta de Aventura - Senderismo
    (8, 2),
    -- Nado con Tiburones Toro - Senderismo
    (9, 2),
    -- Hacer Kayak - Senderismo
    (10, 2),
    -- Manejar coches anfibios en Xplor - Senderismo
    (11, 3),
    -- Caracol Punta-Sur - Pueblos Mágicos
    (12, 3),
    -- El Meco - Pueblos Mágicos
    (13, 1),
    -- Zona Arqueologica de Tulum - Playas
    (14, 1),
    
    -- Zona Arqueologica de Coba - Playas
    (15, 3);



    INSERT INTO LugaresSubcategorias (LugarID, SubcategoriaID) VALUES(15, 10);
    SELECT * FROM LugaresSubcategorias;
-- Zona Arqueologica de San Gervasio - Reservas Naturales
INSERT INTO Detalles(Descripcion, Personas, Precio, LugarID)
VALUES (
        'Hermosa isla ubicada en el mar Caribe, frente a la costa este de la península de Yucatán en México. Conocida por sus impresionantes arrecifes de coral y sus aguas cristalinas, Cozumel es un paraíso para los amantes del buceo y el snorkel. Lugares destacados: Museo de la isla, Parque Nacional Chankanaab. Incluye acceso a eventos especiales.',
        5,
        450.00,
        1
    ),
    (
        'Playa del Carmen es un balneario costero de México que se ubica a lo largo de la costa caribeña de la Riviera Maya, en la Península de Yucatán. Pertenece al estado de Quintana Roo y es famosa por sus playas bordeadas de palmeras y los arrecifes de coral. Lugares a visitar: Parque de los Fundadores, La quinta avenida. Incluye acceso a eventos especiales.',
        5,
        450.00,
        2
    ),
    (
        'Isla Holbox es una isla del norte de la península de Yucatán de México, en el estado de Quintana Roo. Es parte de la Reserva de la Biosfera Yum Balam y la separa del continente la laguna Yalahau, que alberga flamencos y pelícanos. La isla se encuentra entre el mar Caribe y el golfo de México, con aguas ricas en fauna marina, como tortugas marinas. Lugares a visitar: Punta Mosquito, Playa Punta Cocos. Incluye acceso a eventos especiales.',
        5,
        550.00,
        3
    ),
    (
        'Tulum, o antiguamente llamado Zamá, fue una ciudad amurallada de la cultura maya ubicada en el Estado de Quintana Roo, en el sureste de México, en la costa del mar Caribe. En la actualidad es un gran atractivo turístico de la Riviera Maya y junto a ella se encuentra la moderna población del mismo nombre, Tulum. Lugares a visitar: Playa Paraiso, Cenote 2 Ojos. Incluye acceso a eventos especiales.',
        5,
        450.00,
        4
    ),
    (
        'Bacalar es una población del estado mexicano de Quintana Roo, situada en el sur de su territorio a unos 40 km al norte de la capital, Chetumal. Bacalar se encuentra situada en la ribera de la Laguna de Bacalar, la más importante de las lagunas del sur quintanarroense y de gran atractivo turístico. Lugares a visitar: Fuerte de San Felipe, Cenote Azul. Incluye acceso a eventos especiales.',
        5,
        550.00,
        5
    ),
    (
        'El buceo en cenotes ofrece la oportunidad a buzos certificados de descubrir las maravillas del mundo subacuático en las cavernas. Todas las inmersiones en cenotes se realizan con guías profesionales, en el rango de la luz del día, sin necesidad de una formación complementaria. Nuestros guías e instructores están todos certificados para guiar en cuevas. Buceo en Cenotes ofrece una nueva e increíble experiencia que todo buzo debe experimentar en su vida. Incluye acceso a los mejores Cenotes.',
        5,
        250.00,
        6
    ),
    (
        'Estamos seguros que te encantará realizar esta actividad, donde además de disfrutar de un rato de adrenalina también podrás limpiar tus pulmones respirando el aire puro de la selva. Adéntrate a las entrañas de la selva manejando una Bicicleta.',
        5,
        200.00,
        7
    ),
    (
        'Si está preparado para una aventura, nadar con los tiburones ballena en Playa del Carmen sería una experiencia incomparable. Los tiburones ballena son los peces más grandes del océano, se alimentan de plancton y se sienten completamente cómodos con los humanos. El mejor equipo lo acompañará a conocer de cerca a estos gigantes gentiles. ¡No se pierda esta excursión con tiburones ballena en Playa del Carmen! Atrévete a disfrutar esta aventura',
        5,
        650.00,
        8
    ),
    (
        'Localizada dentro de la Biósfera de Sian Ka´an a 20 minutos de Tulum, se encuentra un pequeño poblado llamado Muyil donde la exuberante selva se mezcla con la belleza de la laguna del mismo nombre, que son el escenario perfecto para hacer kayak. Si eres amante de la naturaleza y de la exploración, ¡tienes que vivir esta experiencia!',
        5,
        450.00,
        9
    ),
    (
        'Recorre la selva de la Riviera Maya al volante de vehículos anfibios construidos especialmente para atravesar cavernas inundadas, caminos rocosos y puentes colgantes. La carrocería de nuestros vehículos anfibios es resistente y su diseño te permitirá recorrer el terreno, al tiempo que admiras los alrededores y, con un poco de suerte, hasta te encuentras con alguna de las especies que habitan el parque Xplor. Incluye atracciones únicas y especiales.',
        5,
        650.00,
        10
    ),
    (
        'Ruinas de un templo maya pequeño con varios caparazones de caracol incorporados en el estuco. La Zona Arqueológica Caracol–Punta Sur se localiza en la Isla de Cozumel, este sitio del Posclásico Tardío se encuentra formado por dos templos y un altar. Caracol–Punta Sur es un buen ejemplo de los lugares que conformaban el sistema de navegación de la Costa Oriental de Quintana Roo, cuyo propósito principal era facilitar la actividad comercial entre las distintas poblaciones de la zona. Conoce más sobre la historia de nuestro estado.',
        5,
        300.00,
        11
    ),
    (
        'El Meco es un yacimiento arqueológico de la cultura maya precolombina, localizado en el sureste de México, en el territorio que hoy ocupa el estado de Quintana Roo, unos ocho kilómetros al norte del centro de Cancún. El lugar era de importancia para la navegación de los mayas. Era una marca para la navegación costera y para el interior de la laguna adyacente. Conoce más sobre la historia de nuestro estado.',
        5,
        200.00,
        12
    ),
    (
        'Tulum es una ciudad de la costa caribeña de México. Es conocida por sus ruinas bien conservadas de un antiguo puerto maya. El edificio principal es una gran estructura de piedra llamada El Castillo, que se alza en la parte superior de un acantilado rocoso, sobre las playas de arena blanca y el mar turquesa. Cerca de las ruinas, se encuentra el Parque Nacional Tulum, un área costera con manglares y cenotes. Conoce más sobre la historia de nuestro estado.',
        5,
        350.00,
        13
    ),
    (
        'La ciudad de Cobá se desarrolló cerca de cinco lagos que fueron un factor fundamental para su desarrollo y subsistencia. Con aproximadamente 70km² de extensión, la ciudad estaba comunicada por extensos caminos levantados de piedra, conocidos en lengua maya como sacbé (camino blanco), de longitud y ancho variables. Conoce más sobre la historia de nuestro estado.',
        5,
        250.00,
        14
    ),
    (
        'Este yacimiento fue conocido por los europeos durante las primeras exploraciones que hicieron a la isla de Cozumel, durante la primera parte del siglo XVI, previas al inicio de las hostilidades entre españoles y los indígenas mayas que ahí vivían, que condujeron finalmente a la conquista de Yucatán. Conoce más sobre la historia de nuestro estado',
        5,
        250.00,
        15
    );
-- Inserciones de ejemplo

INSERT INTO Reservas(UsuarioID, DetallesID, Fecha)
VALUES (1, 1, CURDATE());
-- VISTAS 
CREATE VIEW VW_Obtener_Categorias AS
SELECT * FROM Categorias;

CREATE VIEW VW_Obtener_Viajes AS
SELECT Lugares.Nombre AS NombreLugar, Lugares.Informacion, Lugares.Imagenes,
       Categorias.Nombre AS NombreCategoria, Categorias.Descripcion, Categorias.Imagen,
       Lugares.Id, Lugares.Estatus AS Estado, SC.Id AS SubID, SC.Nombre AS SubNombre
FROM Lugares INNER JOIN LugaresSubcategorias ON Lugares.Id = LugaresSubcategorias.LugarID INNER JOIN Subcategorias AS SC ON LugaresSubcategorias.SubcategoriaID = SC.Id INNER JOIN Categorias ON Categorias.Id = SC.CategoriaID;

SELECT * FROM Categorias;

DROP VIEW VW_Obtener_Viajes;

SELECT * FROM VW_Obtener_Viajes WHERE NombreCategoria = "Historicos" AND Estado = 1;


SELECT Subcategorias.Nombre AS NombreSubcategoria, Lugares.Nombre AS NombreLugar, 
FROM LugaresSubcategorias
JOIN Subcategorias ON LugaresSubcategorias.SubcategoriaID = Subcategorias.Id
JOIN Lugares ON LugaresSubcategorias.LugarID = Lugares.Id  FULL JOIN 


CREATE VIEW VistaLugares AS
SELECT 
    L.Id AS LugarID,
    L.Nombre AS NombreLugar,
    L.Informacion AS InformacionLugar,
    L.Imagenes AS ImagenesLugar,
    L.Estatus AS EstatusLugar,
    L.Latitud AS LatitudLugar,
    L.Longitud AS LongitudLugar,
    C.Id AS CategoriaID,
    C.Nombre AS NombreCategoria,
    C.Descripcion AS DescripcionCategoria,
    C.Imagen AS ImagenCategoria,
    C.Estatus AS EstatusCategoria,
    S.Id AS SubcategoriaID,
    S.Nombre AS NombreSubcategoria,
    S.Descripcion AS DescripcionSubcategoria
FROM LugaresSubcategorias LS
INNER JOIN Lugares L ON L.Id = LS.LugarID
INNER JOIN Subcategorias S ON LS.SubcategoriaID = S.Id
INNER JOIN Categorias C ON S.CategoriaID = C.Id ;


--
SELECT * FROM LugaresSubcategoriasg
--


CREATE VIEW LugaresPorCategoria AS
SELECT L.*
FROM Lugares L
INNER JOIN LugaresSubcategorias LS ON L.Id = LS.LugarID
INNER JOIN Subcategorias S ON LS.SubcategoriaID = S.Id
INNER JOIN Categorias C ON S.CategoriaID = C.Id;

SELECT * from LugaresSubcategorias

drop view LugaresPorCategoria

CREATE VIEW VW_Obtener_Lugares_Detalles AS
SELECT Lugares.Nombre, Detalles.Descripcion, Detalles.Personas, Detalles.Precio, Lugares.Imagenes, Lugares.Id AS LugarID, Lugares.Estatus AS Estado, Lugares.Latitud AS Latitud, Lugares.Longitud AS Longitud, Categorias.Nombre AS CategoriaNombre FROM Detalles INNER JOIN Lugares ON Lugares.Id = Detalles.LugarID
INNER JOIN Categorias on Lugares.CategoriaID = Categorias.Id;
SELECT * FROM VW_Obtener_Lugares_Detalles;VW_Obtener_Lugares_Detalles

SELECT COUNT(*) AS ids from Lugares group by @@identity;




CREATE VIEW VW_Obtener_Subcategorias AS
SELECT L.Id AS LugarID, L.Nombre AS LugarNombre, L.Informacion AS LugarInformacion,
       L.Imagenes AS LugarImagenes, L.CategoriaID,
       S.SubcategoriaID, SC.Nombre AS SubcategoriaNombre, SC.Descripcion AS SubcategoriaDescripcion
FROM Lugares AS L
JOIN LugaresSubcategorias AS S ON L.Id = S.LugarID
JOIN Subcategorias AS SC ON S.SubcategoriaID = SC.Id;



SELECT * FROM Subcategorias;
DELIMITER //
CREATE PROCEDURE SP_CrearSubcategorias(nombres VARCHAR(50), descripcion TEXT, categoriaId INT)
BEGIN
INSERT INTO Subcategorias(Nombre, Descripcion, CategoriaID)
VALUES (nombres, descripcion, categoriaId);
END //

CALL SP_CrearSubcategorias("Bellos", "Los lugares mas bellos", 1);

SELECT * FROM Subcategorias;

drop view VW_Obtener_Etiquetas;

CREATE VIEW VW_Obtener_Etiquetas AS
select Subcategorias.Id, Subcategorias.Nombre, Subcategorias.Descripcion, Categorias.Nombre as CategoriasNombre,Subcategorias.Estatus from Subcategorias
inner JOIN Categorias on Subcategorias.CategoriaID = Categorias.Id;


CREATE VIEW VW_Obtener_Usuarios AS
SELECT * FROM Usuarios;

SElect * from Categorias inner Join Subcategorias on Categorias.Id = Subcategorias.CategoriaID;



-- STORED PROCEDURES
DELIMITER //
CREATE PROCEDURE SP_Registrar_Usuario(
    IN nombreUsuario VARCHAR(100),
    IN apellidoUsuario VARCHAR(100),
    IN correoUsuario VARCHAR(100),
    IN contraseniaUsuario VARCHAR(100)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    START TRANSACTION;
    INSERT INTO Usuarios (Nombre, Apellido, Correo, Contrasenia, Fecha_Creacion)
    VALUES (nombreUsuario, apellidoUsuario, correoUsuario, contraseniaUsuario, CURDATE());
    COMMIT;
END //
DELIMITER;

DELIMITER //
CREATE PROCEDURE CambiarRolUsuario(IN obtenerUsuario INT, IN nuevoRol INT)
BEGIN
    UPDATE Usuarios SET RolID = nuevoRol WHERE Id = obtenerUsuario;
END//
DELIMITER;


DELIMITER //
CREATE PROCEDURE EliminarUsuario(IN usuarioId INT)
BEGIN
    DELETE FROM Usuarios WHERE Id = usuarioId;
END//
DELIMITER ;

CREATE VIEW VW_Cantidad AS
SELECT
  u.usuarios AS usuarios,
  a.administradores AS administradores,
  l.categorias AS categorias,
  d.lugares AS viajes
  FROM
  (select count(*) as usuarios from Usuarios where RolID = 2) AS u,
  (select count(*) as administradores from Usuarios where RolID = 1) AS a,
  (select count(*) as categorias from Categorias where Estatus = 1) AS l,
  (SELECT COUNT(*) as lugares FROM Lugares WHERE Estatus = 1) AS d;
   
-- Modificar Tablas
DELIMITER //
CREATE PROCEDURE SP_Actualizar_Categoria(
    IN p_Id INT,
    IN p_Nombre VARCHAR(50),
    IN p_Descripcion TEXT,
    IN p_Imagen VARCHAR(30)
)
BEGIN
    UPDATE Categorias
    SET
        Nombre = IFNULL(p_Nombre, Nombre),
        Descripcion = IFNULL(p_Descripcion, Descripcion),
        Imagen = IFNULL(p_Imagen, Imagen)
    WHERE
        Id = p_Id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SP_Modificar_Subcategoria(
    IN p_Id INT,
    IN p_Nombre VARCHAR(50),
    IN p_Descripcion TEXT
)
BEGIN
    UPDATE Subcategorias
    SET
        Nombre = IFNULL(p_Nombre, Nombre),
        Descripcion = IFNULL(p_Descripcion, Descripcion)
    WHERE
        Id = p_Id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SP_Actualizar_Lugar(
    IN p_Id INT,
    IN p_Nombre VARCHAR(50),
    IN p_Informacion TEXT,
    IN p_Imagenes JSON
)
BEGIN
    UPDATE Lugares
    SET
        Nombre = IFNULL(p_Nombre, Nombre),
        Informacion = IFNULL(p_Informacion, Informacion),
        Imagenes = IFNULL(p_Imagenes, Imagenes)
    WHERE
        Id = p_Id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SP_ModificarLugarSubcategoria(
    IN p_LugarID INT,
    IN p_SubcategoriaID INT
)
BEGIN
    UPDATE LugaresSubcategorias
    SET
        SubcategoriaID = p_SubcategoriaID
    WHERE
        LugarID = p_LugarID;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SP_Actualizar_Detalle(
    IN p_Id INT,
    IN p_Descripcion TEXT,
    IN p_Personas INT,
    IN p_Precio DECIMAL(7, 2),
    IN p_LugarID INT
)
BEGIN
    UPDATE Detalles
    SET
        Descripcion = IFNULL(p_Descripcion, Descripcion),
        Personas = IFNULL(p_Personas, Personas),
        Precio = IFNULL(p_Precio, Precio),
        LugarID = IFNULL(p_LugarID, LugarID)
    WHERE
        Id = p_Id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SP_Actualizar_Rol(
    IN p_Id INT,
    IN p_Nombre VARCHAR(30),
    IN p_Descripcion TEXT
)
BEGIN
    UPDATE Roles
    SET
        Nombre = IFNULL(p_Nombre, Nombre),
        Descripcion = IFNULL(p_Descripcion, Descripcion)
    WHERE
        Id = p_Id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SP_Actualizar_Usuario(
    IN p_Id INT,
    IN p_Nombre VARCHAR(100),
    IN p_Apellido VARCHAR(100),
    IN p_Correo VARCHAR(100),
    IN p_Contrasenia VARCHAR(100),
    IN p_Avatar VARCHAR(150),
    IN p_RolID INT,
    IN p_Fecha_Creacion DATE
)
BEGIN
    UPDATE Usuarios
    SET
        Nombre = IFNULL(p_Nombre, Nombre),
        Apellido = IFNULL(p_Apellido, Apellido),
        Correo = IFNULL(p_Correo, Correo),
        Contrasenia = IFNULL(p_Contrasenia, Contrasenia),
        Avatar = IFNULL(p_Avatar, Avatar),
        RolID = IFNULL(p_RolID, RolID),
        Fecha_Creacion = IFNULL(p_Fecha_Creacion, Fecha_Creacion)
    WHERE
        Id = p_Id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SP_Actualizar_Reserva(
    IN p_Id INT,
    IN p_UsuarioID INT,
    IN p_DetallesID INT,
    IN p_Fecha DATE
)
BEGIN
    UPDATE Reservas
    SET
        UsuarioID = IFNULL(p_UsuarioID, UsuarioID),
        DetallesID = IFNULL(p_DetallesID, DetallesID),
        Fecha = IFNULL(p_Fecha, Fecha)
    WHERE
        Id = p_Id;
END //
DELIMITER ;
-- AGREGAR - ELIMINAR

DELIMITER //
CREATE PROCEDURE SP_Agregar_Categoria(
    IN nombreCategoria VARCHAR(50),
    IN descripcionCategoria TEXT,
    IN imagenCategoria VARCHAR(30)
)
BEGIN
    INSERT INTO Categorias (Nombre, Descripcion, Imagen)
    VALUES (nombreCategoria, descripcionCategoria, imagenCategoria);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SP_Eliminar_Categoria(
    IN categoriaId INT
)
BEGIN
    DELETE FROM Categorias WHERE Id = categoriaId;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SP_Agregar_Lugar(
    IN nombreLugar VARCHAR(50),
    IN informacionLugar TEXT,
    IN imagenesLugar JSON
    )
BEGIN
    INSERT INTO Lugares (Nombre, Informacion, Imagenes)
    VALUES (nombreLugar, informacionLugar, imagenesLugar);
END //
DELIMITER;

DROP PROCEDURE SP_Agregar_Lugar;

DELIMITER //
CREATE PROCEDURE SP_Eliminar_Lugar(
    IN lugarId INT
)
BEGIN
    DELETE FROM Lugares WHERE Id = lugarId;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SP_Agregar_Lugar_Subcategoria(
    IN lugarId INT,
    IN subcategoriaId INT
)
BEGIN
    INSERT INTO LugaresSubcategorias (LugarID, SubcategoriaID)
    VALUES (lugarId, subcategoriaId);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SP_Eliminar_Lugar_Subcategoria(
    IN lugarId INT,
    IN subcategoriaId INT
)
BEGIN
    DELETE FROM LugaresSubcategorias WHERE LugarID = lugarId AND SubcategoriaID = subcategoriaId;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SP_Agregar_Detalle(
    IN descripcionDetalle TEXT,
    IN personasDetalle INT,
    IN precioDetalle DECIMAL(7, 2),
    IN lugarId INT
)
BEGIN
    INSERT INTO Detalles (Descripcion, Personas, Precio, LugarID)
    VALUES (descripcionDetalle, personasDetalle, precioDetalle, lugarId);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SP_Eliminar_Detalle(
    IN detalleId INT
)
BEGIN
    DELETE FROM Detalles WHERE Id = detalleId;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SP_Agregar_Rol(
    IN nombreRol VARCHAR(30),
    IN descripcionRol TEXT
)
BEGIN
    INSERT INTO Roles (Nombre, Descripcion)
    VALUES (nombreRol, descripcionRol);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SP_Eliminar_Rol(
    IN rolId INT
)
BEGIN
    DELETE FROM Roles WHERE Id = rolId;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SP_Eliminar_Usuario(
    IN usuarioId INT
)
BEGIN
    DELETE FROM Usuarios WHERE Id = usuarioId;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SP_Agregar_Reserva(
    IN usuarioId INT,
    IN detallesId INT,
    IN fechaReserva DATE
)
BEGIN
    INSERT INTO Reservas (UsuarioID, DetallesID, Fecha)
    VALUES (usuarioId, detallesId, fechaReserva);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SP_Eliminar_Reserva(
    IN reservaId INT
)
BEGIN
    DELETE FROM Reservas WHERE Id = reservaId;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE SP_Ocultar_Categoria(
    IN categoriaId INT
)
BEGIN
    UPDATE Categorias SET Estatus = 0 WHERE Id = categoriaId;
END //

SELECT * FROM Lugares;


DELIMITER //
CREATE PROCEDURE SP_Ocultar_Lugar(
    IN lugarId INT
)
BEGIN
    UPDATE Lugares SET Estatus = 0 WHERE Id = lugarId;
END //


DELIMITER //
CREATE PROCEDURE SP_Eliminar_Administrador(
    IN adminId INT
)
BEGIN
    UPDATE Usuarios SET RolID = 2 WHERE Id = adminId;
END //

DROP PROCEDURE SP_Eliminar_Administrador;

SELECT * FROM Usuarios;

DELIMITER //
CREATE PROCEDURE SP_Crear_Lugar_Detalle(
    IN p_Nombre VARCHAR(50),
    IN p_Informacion TEXT,
    IN p_Imagenes JSON,
    IN p_Descripcion TEXT,
    IN p_Personas INT,
    IN p_Precio DECIMAL(7, 2),
    IN p_Latitud DECIMAL(10, 8),
    IN p_Longitud DECIMAL(11, 8)
)
BEGIN
    DECLARE lugarId INT;
    INSERT INTO Lugares (Nombre, Informacion, Imagenes, Latitud, Longitud)
    VALUES (p_Nombre, p_Informacion, p_Imagenes, p_Latitud, p_Longitud);

    SET lugarId = LAST_INSERT_ID();

    INSERT INTO Detalles (Descripcion, Personas, Precio, LugarID)
    VALUES (p_Descripcion, p_Personas, p_Precio, lugarId);
END//
DELIMITER;

DROP PROCEDURE SP_Crear_Lugar_Detalle;


DELIMITER //
CREATE PROCEDURE SP_Alta_Categoria(
    IN categoriaId INT
)
BEGIN
    UPDATE Categorias SET Estatus = 1 WHERE Id = categoriaId;
END //
DELIMITER //
CREATE PROCEDURE SP_Alta_Lugar(
    IN lugarId INT
)
BEGIN
    UPDATE Lugares SET Estatus = 1 WHERE Id = lugarId;
END //

DELIMITER //
CREATE PROCEDURE SP_ObtenerSubcategorias(LugarID INT)
BEGIN
SELECT Subcategorias.Nombre FROM LugaresSubcategorias INNER JOIN Subcategorias ON LugaresSubcategorias.SubcategoriaID = Subcategorias.ID
WHERE LugaresSubcategorias.LugarID = LugarID;
END //

CALL SP_ObtenerSubcategorias(2);


-- MODIFICACION DE SUBCATEGORIAS

ALTER TABLE Subcategorias ADD COLUMN CategoriaID INT;
ALTER TABLE Subcategorias ADD CONSTRAINT FK_Subcategorias_Categorias FOREIGN KEY (CategoriaID) REFERENCES Categorias(Id);

ALTER TABLE Lugares DROP CONSTRAINT FK_Lugares_Categorias; 
ALTER TABLE Lugares DROP COLUMN CategoriaID;

UPDATE Subcategorias SET CategoriaID = 1 WHERE Id = 1;
UPDATE Subcategorias SET CategoriaID = 1 WHERE Id = 2;
UPDATE Subcategorias SET CategoriaID = 1 WHERE Id = 3;
UPDATE Subcategorias SET CategoriaID = 2 WHERE Id = 4;
UPDATE Subcategorias SET CategoriaID = 2 WHERE Id = 5;
UPDATE Subcategorias SET CategoriaID = 1 WHERE Id = 6;
UPDATE Subcategorias SET CategoriaID = 3 WHERE Id = 7;
UPDATE Subcategorias SET CategoriaID = 3 WHERE Id = 8;
UPDATE Subcategorias SET CategoriaID = 3 WHERE Id = 9;
UPDATE Subcategorias SET CategoriaID = 2 WHERE Id = 10;


SELECT * FROM LugaresSubcategorias 
JOIN Lugares ON LugaresSubcategorias.LugarID = Lugares.Id 
JOIN Subcategorias ON LugaresSubcategorias.SubcategoriaID = Subcategorias.Id 
JOIN Categorias ON Categorias.Id = Subcategorias.CategoriaID WHERE Categorias.Nombre = "Aventura"

SELECT * FROM Subcategorias JOIN Categorias ON Categorias.Id = Subcategorias.CategoriaID JOIN LugaresSubcategorias ON LugaresSubcategorias.SubcategoriaID = Subcategorias.Id;

SELECT * FROM LugaresSubcategorias;


CREATE VIEW VW_AuxiliarSubcategorias as
select 
Subcategorias.id as Id,
Subcategorias.Nombre as SubcategoriasNombre,
Categorias.id as CategoriasId,
Categorias.Nombre as CategoriasNombre,
Categorias.Descripcion as CategoriaDescripcion,
Subcategorias.Descripcion as SubategoriaDescripcion,
Categorias.Imagen as CategoriaImagen,
Categorias.Estatus as CategoriaEstatus
from Subcategorias
join Categorias on Categorias.Id = Subcategorias.CategoriaID;

CREATE VIEW VW_AuxiliarSubcategorias AS
SELECT 
Subcategorias.Id as SubcategoriaId,
Subcategorias.Nombre as SubcategoriasNombre,
Categorias.Id as CategoriasId,
Categorias.Nombre as CategoriasNombre,
Categorias.Descripcion as CategoriaDescripcion,
Subcategorias.Descripcion as SubategoriaDescripcion,
Categorias.Imagen as CategoriaImagen,
Categorias.Estatus as CategoriaEstatus
FROM Subcategorias
JOIN Categorias on Categorias.Id = Subcategorias.CategoriaID;

CREATE VIEW VW_Obtener_Relacion
SELECT 
    *
FROM 
    Lugares AS L
JOIN 
    LugaresSubcategorias AS LS ON L.Id = LS.LugarID
left JOIN 
    VW_AuxiliarSubcategorias AS S ON LS.SubcategoriaID = S.Id

DELIMITER//
CREATE PROCEDURE SP_Modificar_Subcategoria(IN CategoriaID INT)
BEGIN

END//

CREATE VIEW VW_Obtener_Etiquetas AS
SELECT * FROM Subcategorias;

CREATE VIEW VW_AuxiliarSubcategorias AS
SELECT 
Subcategorias.id AS SubcategoriasId,
Subcategorias.Nombre AS SubcategoriasNombre,
Subcategorias.Estatus AS SubcategoriasEstatus,
Categorias.id AS CategoriasId,
Categorias.Nombre AS CategoriasNombre,
Categorias.Descripcion AS CategoriaDescripcion,
Subcategorias.Descripcion AS SubategoriaDescripcion,
Categorias.Imagen AS CategoriaImagen,
Categorias.Estatus AS CategoriaEstatus
FROM Subcategorias
JOIN Categorias ON Categorias.id = Subcategorias.CategoriaID;

CREATE VIEW VW_Obtener_Relacion AS
SELECT 
    *
FROM 
    Lugares AS L
JOIN 
    LugaresSubcategorias AS LS ON L.Id = LS.LugarID
left JOIN 
    VW_AuxiliarSubcategorias AS S ON LS.SubcategoriaID = S.SubcategoriasId;