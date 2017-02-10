import React from 'react';
import { Flex } from 'reflexbox';
import Icon from 'react-geomicons';
import {
  Rating, SequenceMap, Toolbar, Textarea, Switch, Stat, Slider, Select, SectionHeader, Radio, Progress, Pre, Menu,
  Message, Overlay, PageHeader, Panel, PanelHeader, PanelFooter, Tooltip,
  DropdownMenu, Dropdown, NavItem, Drawer, DotIndicator, Donut, Divider, Close, Container, Checkbox, Card, CardImage,
  ButtonOutline, ButtonCircle, Text, Table, Block, Breadcrumbs, Blockquote, Banner, Media, Arrow, Avatar,
  LinkBlock, Label, Input, InlineForm, HeadingLink, Footer, /*Embed,*/ Button, Heading, Space, Badge, Section } from 'rebass';

const icons = ['bookmark', 'calendar', 'camera', 'chat', 'check', 'clock',
  'close', 'cloud', 'cog', 'compose', 'expand', 'external', 'file', 'folder', 'geolocation',
  'grid', 'heart', 'home', 'info', 'link', 'list', 'lock', 'mail', 'next', 'no', 'pause', 'picture',
  'pin', 'play', 'previous', 'refresh', 'repost', 'search', 'skull', 'speaker', 'speaker', 'star', 'tag',
  'trash', 'user', 'video', 'warning'];

class StylesPage extends React.Component {
  constructor() {
    super();
    this.state = {
      isSwitchOn: false,
      isOverlayOn: false,
      isDrawerOpen: false,
    };
  }
  getItems = () => [
    ['Arrow', <Arrow />],
    ['Avatar', <Avatar src="https://twistedsifter.files.wordpress.com/2016/09/kittens-and-their-matching-bunnies-3.jpg?w=600&h=451" />],
    ['Badge', (
      <span>
        <Badge rounded theme="info">0.2.0</Badge>
        <Space x={1} />
        <Badge pill rounded theme="info">Pill</Badge>
        <Space x={1} />
        <Badge circle rounded theme="error">4 </Badge>
      </span>
    )],
    ['Banner', (
      <Banner align="center" backgroundImage="http://dreamatico.com/data_images/kitten/kitten-1.jpg">
        <Heading level={2} size={0}>Heading</Heading>
      </Banner>
    )],
    ['Block', (
      <Block borderLeft color="blue" px={2}>
        <Media img="http://placehold.it/128/08e/fff">
          <Heading level={2} size={0}>Heading</Heading>
          <Text>Text</Text>
        </Media>
      </Block>
    )],
    ['Blockquote', <Blockquote href="http://webtypography.net/3.1.1" source="Robert Bringhurst" >In the sixteenth century, a series of common sizes developed among European typographers, and the series survived with little change and few additions for 400 years. […] Use the old familiar scale, or use new scales of your own devising, but limit yourself, at first, to a modest set of distinct and related intervals.</Blockquote>],
    ['Breadcrumbs', <Breadcrumbs links={[{ children: 'Jxnblk', href: '#!' }, { children: 'Rebass', href: '#!' }, { children: 'Breadcrumbs', href: '#!' }]} />],
    ['Button', <Button backgroundColor="primary" color="white" inverted rounded>Button</Button>],
    ['ButtonCircle', (
      <Flex align="center" justify="space-between" wrap>
        <ButtonCircle title="Like"><Icon name="heart" /></ButtonCircle>
        <Space />
        <ButtonCircle title="Comment"><Icon name="chat" /></ButtonCircle>
        <Space />
        <ButtonCircle title="Repost"><Icon name="repost" /></ButtonCircle>
        <Space />
        <ButtonCircle title="Bookmark"><Icon name="bookmark" /></ButtonCircle>
        <Space />
        <ButtonCircle title="Tag"><Icon name="tag" /></ButtonCircle>
      </Flex>
    )],
    ['ButtonOutline', (
      <div>
        <ButtonOutline color="primary" rounded="left">ButtonOutline</ButtonOutline>
        <ButtonOutline color="primary" style={{ marginLeft: -1 }}>ButtonOutline</ButtonOutline>
        <Button backgroundColor="primary" color="white" inverted rounded="right" style={{ marginLeft: -1 }}>Button</Button>
      </div>
    )],
    ['Card', (
      <Card rounded width={256}>
        <CardImage src="http://placehold.it/320/08e/fff" />
        <Heading level={2} size={3}>Heading</Heading>
        <Text>Text</Text>
      </Card>
    )],
    ['Checkbox', (
      <div>
        <Checkbox label="Checkbox" name="checkbox_1" />
        <Checkbox checked label="Checkbox" name="checkbox_1" readOnly theme="success" />
      </div>
    )],
    ['Close', <Close />],
    ['Container', <Container style={{ backgroundColor: 'lightgrey' }}>Container</Container>],
    ['Divider', <div><Divider /><Divider ml={0} width={128} /></div>],
    ['Donut', <Donut color="primary" size={128} strokeWidth={8} value={0.125} />],
    ['DotIndicator', <DotIndicator active={0} length={3} onClick={function noRefCheck() {}} />],
    ['Drawer', (
      <div>
        <Button onClick={() => this.setState({ isDrawerOpen: true })}>Open</Button>
        <Drawer open={this.state.isDrawerOpen} position="right" onDismiss={() => this.setState({ isDrawerOpen: false })}>
          <Button onClick={() => this.setState({ isDrawerOpen: false })}>Close</Button>
        </Drawer>
      </div>
    )],
    ['Dropdown', (
      <Dropdown>
        <Button backgroundColor="primary" color="white" inverted rounded>Dropdown<Arrow direction="down" /></Button>
        <DropdownMenu onDismiss={function noRefCheck() {}}>
          <NavItem is="a">NavItem 1</NavItem>
          <NavItem is="a">NavItem 2</NavItem>
        </DropdownMenu>
      </Dropdown>
    )],
    //['Embed', <Embed ratio={0.5625}><iframe allowFullScreen src="http://omfgdogs.com" /></Embed>],
    ['Footer', <Footer>Footer™ ©2017</Footer>],
    ['Heading', (
      <div>
        <Heading level={1}>Heading 1</Heading>
        <Heading level={2}>Heading 2</Heading>
        <Heading level={3}>Heading 3</Heading>
        <Heading level={4}>Heading 4</Heading>
        <Heading level={5}>Heading 5</Heading>
        <Heading level={6}>Heading 6</Heading>
        <Heading alt level={1}>Alt Heading 1</Heading>
        <Heading alt level={2}>Alt Heading 2</Heading>
        <Heading alt level={3}>Alt Heading 3</Heading>
        <Heading alt level={4}>Alt Heading 4</Heading>
        <Heading alt level={5}>Alt Heading 5</Heading>
        <Heading alt level={6}>Alt Heading 6</Heading>
        <Heading big level={1}>Big Heading 1</Heading>
        <Heading big level={2}>Big Heading 2</Heading>
        <Heading big level={3}>Big Heading 3</Heading>
        <Heading big level={4}>Big Heading 4</Heading>
        <Heading big level={5}>Big Heading 5</Heading>
        <Heading big level={6}>Big Heading 6</Heading>
      </div>
    )],
    ['HeadingLink', <HeadingLink href="#HeadingLink" level={2}>HeadingLink</HeadingLink>],
    ['InlineForm', <InlineForm buttonLabel="Go" label="InlineForm" name="inline_form" onChange={function noRefCheck() {}} onClick={function noRefCheck() {}} />],
    ['Icon', <Flex wrap>{
      icons.map((name, j) => <Tooltip key={j} title={name}><Icon name={name} /><Space /></Tooltip>) // eslint-disable-line react/no-array-index-key
    }</Flex>],
    ['Input', <Input label="Label" name="name" placeholder="Placeholder" rounded type="text" />],
    ['Label', <Label>Label</Label>],
    ['LinkBlock', <LinkBlock href="#LinkBlock" is="a"><Media align="center" img="http://placehold.it/96/08e/fff"><Heading level={3}>LinkBlock</Heading></Media></LinkBlock>],
    ['Media', (
      <Media align="center" img="http://placehold.it/128/08e/fff">
        <Heading level={3}>Heading</Heading>
        <Text>Text</Text>
      </Media>
    )],
    ['Menu', (
      <Menu rounded>
        <NavItem is="a">NavItem 1</NavItem>
        <NavItem is="a">NavItem 2</NavItem>
        <NavItem is="a">NavItem 2</NavItem>
      </Menu>
    )],
    ['Message', <Message inverted rounded theme="success">Message<Space auto x={1} /><Close /></Message>],
    ['Overlay', (
      <div>
        <Button onClick={() => this.setState({ isOverlayOn: true })}>Enable</Button>
        <Overlay open={this.state.isOverlayOn} onDismiss={() => {}}>
          <Button onClick={() => this.setState({ isOverlayOn: false })}>Disable</Button>
        </Overlay>
      </div>
    )],
    ['PageHeader', <PageHeader description="Description" heading="Heading" />],
    ['Panel', (
      <Panel theme="info">
        <PanelHeader inverted theme="default">PanelHeader</PanelHeader>
        <Text>Text</Text>
        <PanelFooter theme="default">PanelFooter</PanelFooter>
      </Panel>
    )],
    ['Pre', (
      <Pre>
        const pre = &apos;preformatted text&apos;
      </Pre>
    )],
    ['Progress', <Progress color="primary" value={0.25} />],
    ['Radio', (
      <div>
        <Radio checked circle label="Radio 1" name="radio1" readOnly />
        <Radio circle label="Radio 2" name="radio1" />
      </div>
    )],
    ['Rating', <Rating color="orange" value={3.5} />],
    ['Section', (
      <Section>
        <SectionHeader description="With linked header" heading="Section Header" />
        Section
      </Section>
    )],
    ['Select', (
      <Select
        label="Select"
        name="select_example"
        options={[
          { children: 'Two', value: 2 },
          { children: 'Four', value: 4 },
          { children: 'Eight', value: 8 },
          { children: 'Sixteen', value: 16 },
          { children: 'Thirty-Two', value: 32 },
          { children: 'Sixty-Four', value: 64 },
        ]}
        rounded
      />
    )],
    ['SequenceMap', (
      <SequenceMap
        active={1}
        steps={[
          { children: 'Sign In', href: '#!' },
          { children: 'Shipping Address', href: '#!' },
          { children: 'Payment Method', href: '#!' },
          { children: 'Place Order', href: '#!' },
        ]}
      />
    )],
    ['Slider', (
      <div>
        <Slider defaultValue={37.5} label="Slider" name="slider_1" />
        <Slider color="blue" fill label="Disabled slider with color and fill" name="slider_2" readOnly value={62.5} />
      </div>
    )],
    ['Space', (
      <div>
        <Button backgroundColor="primary" color="white" inverted rounded>Button</Button>
        <Space x={1} />
        <Button backgroundColor="primary" color="white" inverted rounded>With</Button>
        <Space x={4} />
        <Button backgroundColor="primary" color="white" inverted rounded>Space</Button>
      </div>
    )],
    ['Stat', (
      <Flex justify="space-between" wrap>
        <Stat label="Memory" unit="GB" value="512" />
        <Space x={3} />
        <Stat label="PetaFLOPS" value="32" />
        <Space x={3} />
        <Stat label="Upload" unit="Mbps" value="512" />
        <Space x={3} />
        <Stat label="Download" unit="Mbps" value="1,024" />
      </Flex>
    )],
    ['Switch', (
      <Switch checked={this.state.isSwitchOn} onClick={() => this.setState({ isSwitchOn: !this.state.isSwitchOn })} />
    )],
    ['Table', (
      <Table
        headings={['Column1', 'Column2']}
        data={[['Data 1', 'Data 2'], ['Data 3', 'Data 4']]}
      />
    )],
    ['Text', (
      <div>
        <Text>Text</Text>
        <Text bold>Bold Text</Text>
        <Text small>Small Text</Text>
      </div>
    )],
    ['Textarea', <Textarea defaultValue="Default Value" label="Label" name="name" rounded />],
    ['Toolbar', (
      <Toolbar>
        <NavItem is="a">NavItem 1</NavItem>
        <NavItem is="a">NavItem 2</NavItem>
        <Space auto x={1} />
        <NavItem is="a">NavItem 3</NavItem>
      </Toolbar>
    )],
    ['Tooltip', <Tooltip inverted rounded title="Tooltip"><Heading level={3}>Hover Over Me</Heading></Tooltip>],
  ];
  render = () => {
    const items = this.getItems();
    return (
      <Flex>
        <Section>
          <Menu>
            {
              items.map(([name], index) => <NavItem key={index} href={`#${name}`}><LinkBlock >{name}</LinkBlock></NavItem>) // eslint-disable-line react/no-array-index-key
            }
          </Menu>
        </Section>
        <Section>
          <Flex ml={4} mr={4} flexColumn align="center">
            <Flex align="center" justify="space-around">
              <Heading big>Styles</Heading>
            </Flex>
            <LinkBlock href="http://jxnblk.com/rebass" is="a" target="_blank">Reference</LinkBlock>
            <Table data={this.getItems().map(([name, comp]) => [<Heading mr={4} mt={3} mb={3} level={4}>{name}</Heading>, <Flex id={name} justify="center" ml={4} mt={3} mb={3}>{comp}</Flex>])} />
          </Flex>
        </Section>
      </Flex>
    );
  };
}

export default StylesPage;
