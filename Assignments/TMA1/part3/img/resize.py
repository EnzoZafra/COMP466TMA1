from PIL import Image, ImageChops

for i in range(1, 21):
  size = (720, 405)
  filename = str(i) + '.jpg'
  F_OUT = 'resized/' + filename
  print(filename)
  image = Image.open(filename);
  image = image.resize(size, Image.ANTIALIAS)
  image_size = image.size

  thumb = image.crop( (0, 0, size[0], size[1]) )

  offset_x = max( (size[0] - image_size[0]) / 2, 0 )
  offset_y = max( (size[1] - image_size[1]) / 2, 0 )

  thumb = ImageChops.offset(thumb, offset_x, offset_y)
  thumb.save(F_OUT, 'JPEG', quality=90)
  # image.save(F_OUT, 'JPEG', quality=90)
