<?php /* #?ini charset="utf-8"?

[ImageMagick]
Filters[]=geometry/resizeAndCrop=-resize %1x%2^ -gravity Center -crop %3x%4+0+0 +repage

[AliasSettings]
AliasList[]=owbootstrap_carousel
AliasList[]=owbootstrap_carousel_crop

[owbootstrap_carousel]
Reference=
Filters[]=geometry/scaledownonly=870;500

[owbootstrap_carousel_crop]
Reference=
Filters[]=geometry/resizeAndCrop=870;500;870;500

*/ ?>
