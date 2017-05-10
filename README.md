# Recursive Template for Adobe Illustrator CS6+
Open with ExtendScript Toolkit or Adobe Illustrator CS6 or higher. :n)

Recursively loops through all layers present in the current open document. Has two helper functions for interacting with Path and Raster Items.

## Compound Paths and Groups ##
Illustrator allows for the creation of compound paths from groups, but doesn't ungroup everything before creating the new shape. So, if you try to access the pathItems property of such a compound path item, it will appear to be empty. The script tries to compensate for this by undoing the compound shape, then ungrouping until it finds at least one path item, and recompounding. Note that if you have an opacity mask or appearance applied to the compound path, it will get removed.

If you are only trying to access the fill or stroke color of the compound path shape, instead of using the un-compound, un-group hack, you can instead select the item, which will cause the document's default fill and strokes to be set to the fill and stroke of the compound path. Then you can add a new path item to the scene, check its colors, and then delete it.
