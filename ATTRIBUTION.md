# 3D model attribution and license

This project includes modified and decimated anatomical meshes distributed by
[BodyExplorer](https://github.com/JohanBellander/BodyExplorer).

## BodyParts3D

- Creator: The Database Center for Life Science (DBCLS), Japan
- Source: [BodyParts3D / Anatomography](https://lifesciencedb.jp/bp3d/)
- License: [Creative Commons Attribution-ShareAlike 2.1 Japan](https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en)
- Use here: complete skin surface (FMA7163), muscular, tendinous,
  connective-tissue and skeletal meshes

The skin source mesh was obtained from the
[BodyParts3D GitHub mirror](https://github.com/Kevin-Mattheus-Moerman/BodyParts3D),
then decimated and converted to GLB for browser delivery.

## Z-Anatomy

- Creator: Gauthier Kervyn and Z-Anatomy contributors
- Source: [Z-Anatomy](https://www.z-anatomy.com/)
- License: [Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/)
- Use here: supplemental muscular meshes

The file `assets/mesh_mapping.json` records the source dataset for each muscle
mesh. The bundled GLB files and adaptations remain subject to the applicable
CC BY-SA license. Redistribution of modified mesh data must preserve attribution
and use a compatible ShareAlike license.

The Three.js integration in this project was rewritten for the indicator atlas.
BodyExplorer describes its source code as MIT-licensed in its README.
