{def $additionalClasses = ezini( 'RteClass', 'RteRootAdditionalClasses', 'owbootstrap.ini')}
	{if $additionalClasses|count}
		<div class="toolbox noContent">
			<h4>Style</h4>
			<select id="root-additional-classes" name="root-additional-classes">
				{foreach $additionalClasses as $id => $label}
					<option value="{$id}">{$label|wash}</option> 
				{/foreach}
			</select>
		</div>
		{literal}
			<script>
				var current_class = $('#rteBootstrap').attr('class');
				$('#root-additional-classes option[value="'+current_class+'"]').prop('selected', true);
				$('#root-additional-classes').change(function() {
					var bs_class = '';
					$("#root-additional-classes option:selected").each(function () {
			          bs_class = $(this).attr('value');
			        });
					$('#rteBootstrap').attr('class', bs_class);
				});
			</script>
		{/literal}
	{/if}
{undef}