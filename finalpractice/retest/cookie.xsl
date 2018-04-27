<?xml version="1.0"?>
<xsl:stylesheet version="1.0">
  <xsl:template match="/">
    <html>
      <head>
        <title><xsl:value-of select="cookie/information/name"/></title>
      </head>
      <body>
        <h1><xsl:value-of select="cookie/information/name"/></h1>
        <h2><xsl:value-of select="cookie/information/type"/></h2>
        <h3><xsl:value-of select="cookie/information/type"/></h3>
        <br>

          <h5>Nutritional Facts</h5>
          <ul>
            <li>Calories: <xsl:value-of select="cookie/nutrition/calories"/></li>
            <li>Sugar: <xsl:value-of select="cookie/nutrition/sugar"/></li>
            <li>Protein: <xsl:value-of select="cookie/nutrition/protein"/></li>
            <li>Total Fat: <xsl:value-of select="cookie/nutrition/fats/total"/></li>
            <ul>
              <li>Saturated Fat: <xsl:value-of select="cookie/nutrition/fats/saturated"/></li>
              <li>Trans Fat: <xsl:value-of select="cookie/nutrition/fats/trans"/></li>
            </ul>
            <li>Vitamins</li>
            <ul>
              <xsl:for-each select="cookie/nutrition/vitamins/vitamin">
                <li><xsl:value-of select="name"/> - <xsl:value-of select="value"/></li>
              </xsl:for-each>
            </ul>
          </ul>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
