CREATE OR REPLACE VIEW permisosSolicitados AS
SELECT
  PERMISOS.*,
  nombres,
  apellidos,
  direccion,
  ciudad,
  departamento,
  nombreapp,
  descripcion_rol_neg
FROM
  PERMISOS
  INNER JOIN PERSONAS ON PERSONAS.user_id = PERMISOS.user_id
  INNER JOIN APLICATIVOS ON PERMISOS.app_id = APLICATIVOS.app_id
  INNER JOIN ROLES_NEGOCIO ON PERMISOS.rol_neg_id = ROLES_NEGOCIO.rol_neg_id

--worked--
CREATE
OR REPLACE VIEW menusDisponiblesParaPersona AS
SELECT
  user_id,
  nombreapp,
  descripcion_menu
FROM
  PERMISOS
  INNER JOIN ROLES_NEGOCIO_APLICATIVOS ON PERMISOS.app_id = ROLES_NEGOCIO_APLICATIVOS.app_id
  AND PERMISOS.rol_neg_id = ROLES_NEGOCIO_APLICATIVOS.rol_neg_id
  INNER JOIN ROLES_APLICATIVOS_MENU ON PERMISOS.app_id = ROLES_APLICATIVOS_MENU.app_id
  AND ROLES_NEGOCIO_APLICATIVOS.rol_id = ROLES_APLICATIVOS_MENU.rol_id
  INNER JOIN APLICATIVOS_MENU ON ROLES_APLICATIVOS_MENU.menu_id = APLICATIVOS_MENU.menu_id
  INNER JOIN APLICATIVOS ON ROLES_APLICATIVOS_MENU.app_id = APLICATIVOS.app_id
WHERE
  estado = 'AUTORIZADO'

CREATE
OR REPLACE VIEW rolesNegocioConAplicativos AS
SELECT
  ROLES_NEGOCIO_APLICATIVOS.app_id,
  ROLES_NEGOCIO.rol_neg_id,
  ROLES_NEGOCIO.descripcion_rol_neg
FROM
  ROLES_NEGOCIO
  INNER JOIN 
  ROLES_NEGOCIO_APLICATIVOS ON ROLES_NEGOCIO.rol_neg_id = ROLES_NEGOCIO_APLICATIVOS.rol_neg_id

