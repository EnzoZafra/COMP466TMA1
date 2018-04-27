<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <head>
        <title>
          <xsl:value-of select ="/product/information/name"/>
        </title>
      </head>
      <body>
        <h1>
          <xsl:value-of select ="/product/information/name"/>
        </h1>
        <h3>
          <xsl:value-of select ="/product/information/type"/>
        </h3>
        <h5>
          <xsl:value-of select ="/product/information/weight"/>
        </h5>

        <h4>Nutritional Information</h4>
        <ul>
          <li>Calories: <xsl:value-of select="/product/nutrition/calories"/></li>
          <li>Total Fat: <xsl:value-of select="/product/nutrition/fat/total"/></li>
          <ul>
            <li>Saturated Fat: <xsl:value-of select="/product/nutrition/fat/saturated"/></li>
            <li>Trans Fat: <xsl:value-of select="/product/nutrition/fat/transfat"/></li>
          </ul>
          <li>Vitamins</li>
          <ul>
            <xsl:for-each select="/product/nutrition/vitamins/vitamin">
              <li><xsl:value-of select="type"/> - <xsl:value-of select="value"/></li>
            </xsl:for-each>
          </ul>
        </ul>

      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
